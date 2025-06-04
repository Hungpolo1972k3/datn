import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import datasetFolder from "../utils/datasetFolder.json";
import { apiRunBlastnTwoFiles, apiGetFileInfo } from "../service/blastn";
import { apiRunAmrTool } from "../service/amr";
import LoadingSpinner from "./LoadingSpinner";
import BlastnModal from "./Blastn";
import AlignmentViewer from "./AlignmentViewer";

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgb(37 99 235 / 0.15);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #2563eb;
  color: white;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  user-select: none;
  border-bottom: 2px solid #1e40af;
`;

const Td = styled.td`
  background-color: #f9fafb;
  padding: 12px 16px;
  border-bottom: 1px solid #cbd5e1;
  font-size: 0.95rem;
  color: #1e293b;
`;

const Tr = styled.tr`
  transition: background-color 0.25s ease;
  cursor: default;

  &:hover {
    background-color: #dbeafe;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const PageControls = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  background-color: ${(props) =>
    props.active === "true" ? "#1e40af" : "#2563eb"};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }

  &:hover:not(:disabled):not([active="true"]) {
    background-color: #1e40af;
  }
`;

const Select = styled.select`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.95rem;
  border: 1px solid #cbd5e1;
  background-color: white;
  color: #1e293b;
`;

const formatDateVN = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};

const ResultTable = ({ results, blastnInfo }) => {
  const { t } = useTranslation();
  const findInfoByName = (name) =>
    datasetFolder.find((item) => item.name === name);
  const [amrData, setAmrData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [blastnData, setBlastnData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bacteriaInfo, setBacteriaInfo] = useState();
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage, results]);

  const totalPages =
    rowsPerPage === "all" ? 1 : Math.ceil(results.length / rowsPerPage);
  const paginatedResults =
    rowsPerPage === "all"
      ? results
      : results.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        );

  const handleRowsChange = (e) => {
    const value = e.target.value;
    setRowsPerPage(value === "all" ? "all" : parseInt(value));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const [modalInfo, setModalInfo] = useState(null);

  const handleViewDetails = async (url, name, info, bacteria) => {
    setIsLoading(true);
    try {
      let url2 = `/app/FastA/${name}/Spades_output/contigs.fasta`;
      const blastnResult = await apiRunBlastnTwoFiles(url, url2);
      setBlastnData(blastnResult.data);
      setModalInfo(info);
      setShowModal(true);
      setBacteriaInfo(bacteria);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const sampleAMR = [
    {
      protein_identifier: null,
      contig_id: "NODE_11_length_94746_cov_108.497661",
      start: 5667,
      stop: 6479,
      strand: "+",
      gene_symbol: "aph(3')-Ia",
      element_name: "aminoglycoside O-phosphotransferase APH(3')-Ia",
      closest_reference_name: "aminoglycoside O-phosphotransferase APH(3')-Ia",
      scope: "core",
      element_type: "AMR",
      class: "AMINOGLYCOSIDE",
      subclass: "KANAMYCIN",
      method: "EXACTX",
      length: 271,
      reference_length: 271,
      alignment_length: 271,
      coverage: 100,
      identity: 100,
      accession: "WP_000018326.1",
      nucleic:
        "ATGAGCCATATTCAACGGGAAACGTCTTGCTCGAGGCCGCGATTAAATTCCAACCTGGATGCTGATTTATATGGGTATAGATGGGCTCGCGATAATGTCGGGCAATCAGGTGCGACAATCTATCGATTGTATGGGAAGCCCAATGCGCCAGAGTTGTTTCTGAAACATGGCAAAGGTAGCGTTGCCAATGATGTTACAGATGAGATGGTCAGACTAAACTGGCTGACGGCATTTATGCCTCTTCCGACCATCAAGCATTTTATCCGTACTCCTGATGATGCATGGTTACTCACCACTGCGATCCCCGGGAAAACAGCATTCCAGGTATTAGAAGAATATCCTGATTCAGGTGAAAATATTGTTGATGCGCTGGCAGTGTTCCTGCGCCGGTTGCATTCGATTCCTGTTTGTAATTGTCCTTTTAACAGCGATCGCGTATTTCGTCTCGCTCAGGCGCAATCACGAATGAATAACGGTTTGGTTGATGCTAGTGATTTTGATGACGAGCGTAATGGCTGGCCTGTTGAACAAGTCTGGAAAGAAATGCATAAGCTTTTGCCATTCTCACCGGATTCAGTCGTCACTCATGGTGATTTCTCACTTGATAACCTTATTTTTGACGAGGGGAAATTAATAGGTTGTATTGATGTTGGACGAGTCGGAATCGCAGACCGATACCAGGATCTTGCCATCCTATGGAACTGCCTCGGTGAGTTTTCTCCTTCATTACAGAAACGGCTTTTTCAAAAATATGGTATTGATAATCCTGATATGAATAAATTGCAGTTTCATTTGATGCTCGATGAGTTTTTC",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_25_length_43123_cov_121.439096",
      start: 7699,
      stop: 8484,
      strand: "+",
      gene_symbol: "ant(3'')-IIa",
      element_name: "aminoglycoside nucleotidyltransferase ANT(3'')-IIa",
      closest_reference_name:
        "aminoglycoside nucleotidyltransferase ANT(3'')-IIa",
      scope: "core",
      element_type: "AMR",
      class: "AMINOGLYCOSIDE",
      subclass: "SPECTINOMYCIN/STREPTOMYCIN",
      method: "EXACTX",
      length: 262,
      reference_length: 262,
      alignment_length: 262,
      coverage: 100,
      identity: 100,
      accession: "WP_001279062.1",
      nucleic:
        "ATGTCTGATTTCATTCAGTTAGAATATCTACAAGAAAAATTACAGCAACTTTTAGCGGAATCATTATTTGCAATCTATCTTTATGGTTCAGCTGTTGATGGTGGCTTAGGGCCAGAAAGTGACCTTGATGTTCTGGTCGTGGTTACTCAACCATTAACATCTGCTTTACGCGAGCAGCTTGCACAAGAATTACTAAAAATTTCACAGCCTGTTGGAGAATTACAAAGACCATTAGAAGTTACTATTTTATTAAAAGACGAGATTCAGTCTGGAAATTATCCTTTAAGTTATGAAATGCAGTTTGGTGAATGGCTACGTGAAGAACTTAAAGAAGGTGGAACATTAAGTTCGCAGAAAGACCCAGATATTAGTATATTGCTTAGAAAAGCGAGATTTCATCATGCAGTTTTATTTGGTCCAGCTTTAGACCAATGGGCACCTGAAATTTCTGATCAAGAACTATGGCAAGCAATGTCTGATACTTATCCCGAAATTGTAGCTCATTGGGATGAGGATGCAGATGAAAGAAACCAGATTTTAGCTTTATGCCGGATCTATTTTAGTTTAGTCATGAAGGATATTGCTTCAAAAGGCAATGCAGCTCGATGGGTTATGCCTCAGCTTCCTCCTGAGCAGAAATTCGTATTGCAGCGGCTTATACAGGAATATAGAGGGGAAATCGGTAAACAAAATTGGCAAGAGGAACATTATGCTTTGCAGCCTATTGTTAATTTTCTGAGTTCAAAAATTGAAGAGCAGTTTGAGCAGAAAAGAAATTTGATCACA",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_32_length_40475_cov_113.976225",
      start: 39265,
      stop: 40413,
      strand: "-",
      gene_symbol: "blaADC",
      element_name: "ADC family extended-spectrum class C beta-lactamase",
      closest_reference_name:
        "extended-spectrum class C beta-lactamase ADC-199",
      scope: "core",
      element_type: "AMR",
      class: "BETA-LACTAM",
      subclass: "CEPHALOSPORIN",
      method: "BLASTX",
      length: 383,
      reference_length: 388,
      alignment_length: 388,
      coverage: 100,
      identity: 98.45,
      accession: "WP_114166683.1",
      nucleic:
        "ATGCAATTTAAAAAAATTTCTTGTCTACTTTTATCCCCGCTTTTTATTTTTAGTACCTCAATTTATGCGGACAATACACCAAAAGACCAAGAAATTAAAAAACTGGTAGATCAAAATTTTAAACCATTATTAGAAAAATATGATGTGCCGGGTATGGCTGTGGGTGTTATTCAAAATAATAAAAAGTATGAAATGTATTATGGTCTTCAATCTGTTCAAGATAAAAAAGCCGTAAATAGCAGTACTATTTTTGAGCTAGGTTCTGTCAGTAAATTATTTAACGCGACAGCAGGTGGATATGCAAAAAATAAAGGAAAAATCTCTTTTGACGATACGCCTGGTAAATATTGGAAAGAGCTAAAAAATACACCGATTGACCAAGTTAACTTACTTCAACTCGCGACGTATACAAGTGGTAACCTTGCCTTGCAGTTCCCAGATGAAGTACAAACAGATCAACAAGTTTTAACTTTTTTCAAAGACTGGAAACCTAAAAACCCAATCGGTGAATACAGACAATATTCAAATCCAAGTATTGGCCTATTTGGAAAGGTTGTAGCTTTGTCTATGAATAAACCTTTCGACCAAGTGTTAGAAAAAACAATTTTTCCGGCCCTTGGCTTAAAACATAGCTATGTAAATGTACCTAAGACCCAAATGCAAAACTATGCTTTTGGCTATAACCAAGAAAATCAGCCGATTCGAGTTAACCCCGGCCCACTCGATGCCCCAGCATATGGCGTCAAATCGACACTACCCGACATGTTGAGTTTTATTCATGCCAACCTTAACCCACAGAAATATCCGGCAGATATTCAACGGGCAATTAATGAAACACATCAAGGGTTCTATCAAGTAAATACCATGTATCAGGCACTCGGTTGGGAAGAGTTTTCTTATCCGGCAACGTTACAAACTTTATTAGACAGTAATTCAGAACAGATTGTGATGAAACCTAATAAAGTGACTGCTATTTCAAAGGAACCTTCAGTTAAGATGTACCATAAAACTGGCTCAACTACCGGTTTCGGAACATATGTAGTGTTTATTCCTAAAGAAAATATTGGTTTAGTCATGTTAACCAATAAACGTATTCCAAATGAAGAGCGCATTAAGGCAGCTTATGCTGTGCTGAATGCAATAAAGAAA",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_42_length_31148_cov_108.556878",
      start: 26347,
      stop: 27168,
      strand: "+",
      gene_symbol: "blaOXA-69",
      element_name:
        "OXA-51 family carbapenem-hydrolyzing class D beta-lactamase OXA-69",
      closest_reference_name:
        "OXA-51 family carbapenem-hydrolyzing class D beta-lactamase OXA-69",
      scope: "core",
      element_type: "AMR",
      class: "BETA-LACTAM",
      subclass: "CARBAPENEM",
      method: "ALLELEX",
      length: 274,
      reference_length: 274,
      alignment_length: 274,
      coverage: 100,
      identity: 100,
      accession: "WP_001021779.1",
      nucleic:
        "ATGAACATTAAAGCACTCTTACTTATAACAAGCGCTATTTTTATTTCAGCCTGCTCACCTTATATAGTGACTGCTAATCCAAATCACAGTGCTTCAAAATCTGATGACAAAGCAGAGAAAATTAAAAATTTATTTAACGAAGCACACACTACGGGTGTTTTAGTTATCCATCAAGGTCAAACTCAACAAAGCTATGGTAATGATCTTGCTCGTGCTTCGACCGAGTATGTACCTGCTTCGACCTTCAAAATGCTTAATGCTTTGATCGGCCTTGAGCACCATAAGGCAACCACCACAGAAGTATTTAAATGGGATGGGGAAAAAAGGCTATTCCCAGAATGGGAAAAGAACATGACCCTAGGCGATGCTATGAAAGCTTCCGCTATTCCGGTTTATCAAGATTTAGCTCGTCGTATTGGACTTGAGCTCATGTCTAAGGAAGTGAAGCGTGTTGGTTATGGCAATGCAGATATCGGTACCCAAGTCGATAATTTTTGGCTGGTGGGTCCTCTAAAAATTACTCCTCAGCAAGAGGCACAGTTTGCTTACAAGCTAGCTAATAAAACGCTTCCATTTAGCCAAAAAGTCCAAGATGAAGTGCAATCCATGCTATTCATAGAAGAAAAGAATGGAAATAAAATATACGCAAAAAGTGGTTGGGGATGGGATGTAAACCCACAAGTAGGCTGGTTAACTGGATGGGTTGTTCAGCCTCAAGGGAATATTGTAGCGTTCTCCCTTAACTTAGAAATGAAAAAAGGAATACCTAGCTCTGTTCGAAAAGAGATTACTTATAAAAGTTTAGAACAATTAGGTATTTTA",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_65_length_15533_cov_86.080501",
      start: 74,
      stop: 886,
      strand: "+",
      gene_symbol: "sul2",
      element_name: "sulfonamide-resistant dihydropteroate synthase Sul2",
      closest_reference_name:
        "sulfonamide-resistant dihydropteroate synthase Sul2",
      scope: "core",
      element_type: "AMR",
      class: "SULFONAMIDE",
      subclass: "SULFONAMIDE",
      method: "EXACTX",
      length: 271,
      reference_length: 271,
      alignment_length: 271,
      coverage: 100,
      identity: 100,
      accession: "WP_001043260.1",
      nucleic:
        "ATGAATAAATCGCTCATCATTTTCGGCATCGTCAACATAACCTCGGACAGTTTCTCCGATGGAGGCCGGTATCTGGCGCCAGACGCAGCCATTGCGCAGGCGCGTAAGCTGATGGCCGAGGGGGCAGATGTGATCGACCTCGGTCCGGCATCCAGCAATCCCGACGCCGCGCCTGTTTCGTCCGACACAGAAATCGCGCGTATCGCGCCGGTGCTGGACGCGCTCAAGGCAGATGGCATTCCCGTCTCGCTCGACAGTTATCAACCCGCGACGCAAGCCTATGCCTTGTCGCGTGGTGTGGCCTATCTCAATGATATTCGCGGTTTTCCAGACGCTGCGTTCTATCCGCAATTGGCGAAATCATCTGCCAAACTCGTCGTTATGCATTCGGTGCAAGACGGGCAGGCAGATCGGCGCGAGGCACCCGCTGGCGACATCATGGATCACATTGCGGCGTTCTTTGACGCGCGCATCGCGGCGCTGACGGGTGCCGGTATCAAACGCAACCGCCTTGTCCTTGATCCCGGCATGGGGTTTTTTCTGGGGGCTGCTCCCGAAACCTCGCTCTCGGTGCTGGCGCGGTTCGATGAATTGCGGCTGCGCTTCGATTTGCCGGTGCTTCTGTCTGTTTCGCGCAAATCCTTTCTGCGCGCGCTCACAGGCCGTGGTCCGGGGGATGTCGGGGCCGCGACACTCGCTGCAGAGCTTGCCGCCGCCGCAGGTGGAGCTGACTTCATCCGCACACACGAGCCGCGCCCCTTGCGCGACGGGCTGGCGGTATTGGCGGCGCTGAAAGAAACCGCAAGAATTCGT",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_77_length_9122_cov_123.866439",
      start: 8331,
      stop: 8840,
      strand: "+",
      gene_symbol: "dfrA44",
      element_name: "trimethoprim-resistant dihydrofolate reductase DfrA44",
      closest_reference_name:
        "trimethoprim-resistant dihydrofolate reductase DfrA44",
      scope: "core",
      element_type: "AMR",
      class: "TRIMETHOPRIM",
      subclass: "TRIMETHOPRIM",
      method: "EXACTX",
      length: 170,
      reference_length: 170,
      alignment_length: 170,
      coverage: 100,
      identity: 100,
      accession: "WP_031380727.1",
      nucleic:
        "ATGGCATTTCAGGATTTAGAAGTCGTTCATGTCGTTGCAATGGATCAGCAGCGCTGTATTGGTAAGGACAATGACCTGCCTTGGCATATCTCAGCAGATCTAAAACATTTTAAGGAAATCACCCAGGGCGGTGTAATTGTAATGGGACGTAAGACCCTTGAATCCATGGGACGTGCCTTGCCTAAACGTGTCAACTGGGTCATTACCCGTGATACAGACTGGTCTTTTGAAGGTACTAAAGTCGCACACACGATTGAAGATGCCTTGAACCAAGCTGTTGCAGATGTAAAAGCGTCAGAAAAACCGGAGTCTATTTATATTATTGGGGGTGGTGAAATCTTCAAACAGACAATGAGTATTGCTGACCGTCTGGAACTGACCCATGTCGAACTGGATGTACAAGGTCATGCCTTCTACCCGGAAATTCCTGCTGAATTCAAAAAAGTTTTTTCCGAACAACATATCGACGACAAAACTGGGATTGCTTTTGAGTTTGCAACTTATAGAAAA",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_82_length_6133_cov_447.840902",
      start: 5794,
      stop: 6132,
      strand: "+",
      gene_symbol: "ant(2'')-Ia",
      element_name: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
      closest_reference_name:
        "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
      scope: "core",
      element_type: "AMR",
      class: "AMINOGLYCOSIDE",
      subclass: "GENTAMICIN/KANAMYCIN/TOBRAMYCIN",
      method: "PARTIAL_CONTIG_ENDX",
      length: 113,
      reference_length: 177,
      alignment_length: 113,
      coverage: 63.84,
      identity: 98.23,
      accession: "WP_000381803.1",
      nucleic:
        "ATGGACACAACGCAGGTCGCATTGATACACCAAATTCTAGCTGCGGCAGATGAGCGAAATCTGCCGCTCTGGATCGGTGGGGGCTGGGCGATCGATGCACGGCTAGGGCGTGTAACACGCAAGCACGATGATATTGATCTGACTTTTCCCGGCGAGAGGCGCGGCGAGCTCGAGGCAATAGTTGAAATGCTCGGCGGGCGCGTCACGGAGGAGTTGGACTATGGATTCTTAGCGGAGATCGGGGATGAGTTACTTGACTGCGAACCTGCTTGGTGGGCAGACGAAGCGTATGAAATCGCGGAGGCTCCGCAGGGCTCGTGCCCAGAGGCGGCTGAGGGT",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_83_length_5734_cov_1020.321535",
      start: 3159,
      stop: 3935,
      strand: "+",
      gene_symbol: "aph(3')-VIa",
      element_name: "aminoglycoside O-phosphotransferase APH(3')-VIa",
      closest_reference_name: "aminoglycoside O-phosphotransferase APH(3')-VIa",
      scope: "core",
      element_type: "AMR",
      class: "AMINOGLYCOSIDE",
      subclass: "AMIKACIN/KANAMYCIN",
      method: "BLASTX",
      length: 259,
      reference_length: 259,
      alignment_length: 259,
      coverage: 100,
      identity: 99.23,
      accession: "WP_000422636.1",
      nucleic:
        "ATGGAATTGCCCAATATTATTCAACAATTTATTGGAAACAGTGTTTTAGAGCCAAATAAAATTGGTCAGTCGCCATCGGATGTTTATTCTTTTAATCGAAATAATGAAACTTTTTTTCTTAAGCGATCTAGCACTTTATATACAGAGACCACATACAGTGTCTCTCGCGAAGCGAAAATGTTGAGTTGGCTCTCTGAGAAATTAAAGGTGCCTGAACTCATCATGACTTTTCAGGATGAGCAGTTTGAATTCATGATCACTAAAGCGATCAATGCAAAACCAATTTCAGCGCTTTTTTTAACAGACCAAGAATTGCTTGCTATCTATAAGGAGGCACTCAATCTGTTAAATTCAGTTGCTATTATTGATTGTCCATTTATTTCAAACATTGATCATCGGTTAAAAGAGTCAAAATTTTTTATTGATAACCAACTCCTTGACGATATAGATCAAGATGATTTTGACGCTGAATTATGGGGAGACCATAAAACTTACCTAAGTCTATGGAATGAGTTAACTGAGACTCGTGTTGAAGAAAGATTGGTTTTTTCTCATGGCGATATCACGGATAGTAATATTTTTATAGATAAATTCAATGAAATTTATTTTTTAGATCTTGGCCGTGCTGGGTTAGCAGATGAATTTGTAGATATATCCTTTGTTGAACGTTGCCTAAGAGAGGATGCATCGGAGGAAACTGCTAAAATATTTTTAAAGCATTTAAAAAATGATAGACCTGACAAAAGGAATTATTTTTTAAAACTTGATGAATTGAAT",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_92_length_3016_cov_118.369912",
      start: 457,
      stop: 1929,
      strand: "+",
      gene_symbol: "msr(E)",
      element_name: "ABC-F type ribosomal protection protein Msr(E)",
      closest_reference_name: "ABC-F type ribosomal protection protein Msr(E)",
      scope: "core",
      element_type: "AMR",
      class: "MACROLIDE/STREPTOGRAMIN",
      subclass: "AZITHROMYCIN/ERYTHROMYCIN/STREPTOGRAMIN",
      method: "EXACTX",
      length: 491,
      reference_length: 491,
      alignment_length: 491,
      coverage: 100,
      identity: 100,
      accession: "WP_000052512.1",
      nucleic:
        "ATGAGTTTAATTATTAAAGCGAGAAACATACGCTTGGATTATGCTGGGCGTGATGTTTTGGATATTGATGAATTGGAAATTCACTCTTATGACCGTATTGGTCTTGTGGGTGATAACGGAGCAGGAAAGAGTAGTTTACTCAAAGTACTTAATGGCGAAATTGTTTTAGCCGAAGCGACATTACAGCGTTTTGGTGATTTTGCACATATCAGCCAACTGGGCGGAATCGAAATAGAAACGGTCGAAGACCGGGCAATGTTATCTCGCCTTGGTGTTTCCAATGTACAAAACGACACAATGAGTGGCGGAGAGGAAACTCGTGCAAAAATTGCTGCCGCATTTTCCCAACAAGTACATGGCATTCTAGCGGATGAACCAACCAGCCACCTTGATCTCAATGGAATAGATCTACTTATTGGTCAACTTAAAGCATTTGATGGAGCATTACTTGTTATCAGTCATGACCGATATTTTCTTGATATGGTTGTAGACAAGATATGGGAGTTAAAAGACGGTAAAATTACGGAATATTGGGGTGGTTACTCGGATTACTTGCGTCAAAAAGAAGAAGAGCGACAACACCAAGCCGTAGAATATGAGCTGATGATGAAGGAACGGGAGCGATTAGAATCTGCTGTGCAAGAAAAACGCCAGCAAGCTAATCGATTAGACAATAAGAAAAAAGGAGAAAAATCCAAAAACTCTACCGAAAGTGCTGGACGACTTGGGCATGCAAAAATGACTGGCACCAAGCAAAGAAAACTGTATCAGGCAGCTAAGAGTATGGAAAAGCGTTTGGCTGCATTAGAAGATATTCAAGCACCAGAGCATTTGCGTTCTATTCGTTTTCGTCAAAGTTCAGCCCTAGAACTGCACAATAAGTTCCCGATTACGGCAGATGGTCTGAGCTTAAAATTTGGTAGCCGTACTATCTTTGATGACGCTAACTTTATAATACCGCTTGGCGCTAAAGTCGCTATAACTGGATCGAATGGAACAGGGAAAACGTCCTTGTTAAAAATGATATCAGAACGTGCTGATGGATTAACCATATCTCCAAAAGCTGAAATTGGCTACTTTACACAAACAGGATATAAATTTAACACGCATAAATCTGTGCTCTCCTTTATGCAGGAAGAGTGCGAGTACACAGTTGCGGAAATTCGTGCAGTATTGGCTTCAATGGGGATCGGAGCGAATGATATTCAAAAAAACTTATCCGACTTATCGGGAGGTGAAATCATCAAACTGCTTTTATCCAAAATGCTTTTAGGAAAATATAATATTTTGCTTATGGATGAACCAGGAAACTATCTTGACCTAAAAAGTATTGCCGCATTAGAAACAATGATGAAGTCCTATGCAGGAACTATTATCTTCGTATCTCATGACAAGCAATTGGTCGATAATATTGCTGACATTATCTACGAGATCAAAGACCACAAAATCATCAAGACTTTTGAGAGAGATTGT",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_92_length_3016_cov_118.369912",
      start: 1988,
      stop: 2869,
      strand: "+",
      gene_symbol: "mph(E)",
      element_name: "Mph(E) family macrolide 2'-phosphotransferase",
      closest_reference_name: "Mph(E) family macrolide 2'-phosphotransferase",
      scope: "core",
      element_type: "AMR",
      class: "MACROLIDE",
      subclass: "ERYTHROMYCIN",
      method: "EXACTX",
      length: 294,
      reference_length: 294,
      alignment_length: 294,
      coverage: 100,
      identity: 100,
      accession: "WP_000155092.1",
      nucleic:
        "ATGACAATTCAAGATATTCAATCACTTGCTGAAGCACACGGCTTGTTGCTTACGGACAAAATGAATTTCAATGAAATGGGCATTGATTTTAAGGTCGTTTTTGCTCTTGATACAAAGGGGCAACAATGGTTGCTGCGTATTCCTCGTCGTGATGGCATGAGGGAACAAATCAAGAAAGAAAAACGCATTTTAGAATTGGTAAAAAAACATCTTTCTGTAGAGGTTCCTGATTGGAGAATTTCATCTACAGAATTAGTGGCTTATCCCATACTTAAAGATAATCCTGTTTTAAATTTGGATGCTGAAACCTATGAAATAATTTGGAATATGGACAAAGATAGCCCGAAATACATAACATCTTTGGCAAAAACCTTATTTGAAATCCATAGTATTCCTGAAAAAGAAGTTCGGGAAAATGATTTGAAAATTATGAAACCTTCAGATTTAAGACCTGAAATAGCAAACAATTTGCAGTTAGTAAAATCTGAAATTGGTATAAGTGAGCAATTGGAAACCCGCTACAGAAAATGGTTGGATAATGATGTTCTATGGGCAGATTTCACCCAATTTATACATGGCGATTTATATGCTGGGCATGTACTAGCTTCAAAGGATGGAGCTGTTTCAGGCGTTATTGATTGGTCAACAGCCCATATAGATGACCCAGCGATTGATTTTGCTGGGCATGTAACTTTGTTTGGAGAAGAAAGCCTCAAAACTCTAATCATCGAGTATGAAAAACTAGGGGGTAAAGTTTGGAATAAACTATATGAACAGACTTTAGAAAGAGCAGCGGCCTCTCCTTTGATGTATGGTTTATTTGCCTTAGAAACTCAAAATGAAAGCCTTATCGTTGGAGCAAAAGCTCAGTTGGGAGTTATA",
    },
    {
      protein_identifier: null,
      contig_id: "NODE_97_length_2547_cov_127.898475",
      start: 88,
      stop: 906,
      strand: "+",
      gene_symbol: "blaOXA-23",
      element_name:
        "OXA-23 family carbapenem-hydrolyzing class D beta-lactamase OXA-23",
      closest_reference_name:
        "OXA-23 family carbapenem-hydrolyzing class D beta-lactamase OXA-23",
      scope: "core",
      element_type: "AMR",
      class: "BETA-LACTAM",
      subclass: "CARBAPENEM",
      method: "ALLELEX",
      length: 273,
      reference_length: 273,
      alignment_length: 273,
      coverage: 100,
      identity: 100,
      accession: "WP_001046004.1",
      nucleic:
        "ATGAATAAATATTTTACTTGCTATGTGGTTGCTTCTCTTTTTCTTTCTGGTTGTACGGTTCAGCATAATTTAATAAATGAAACCCCGAGTCAGATTGTTCAAGGACATAATCAGGTGATTCATCAATACTTTGATGAAAAAAACACCTCAGGTGTGCTGGTTATTCAAACAGATAAAAAAATTAATCTATATGGTAATGCTCTAAGCCGCGCAAATACAGAATATGTGCCAGCCTCTACATTTAAAATGTTGAATGCCCTGATCGGATTGGAGAACCAGAAAACGGATATTAATGAAATATTTAAATGGAAGGGCGAGAAAAGGTCATTTACCGCTTGGGAAAAAGACATGACACTAGGAGAAGCCATGAAGCTTTCTGCAGTCCCAGTCTATCAGGAACTTGCGCGACGTATCGGTCTTGATCTCATGCAAAAAGAAGTAAAACGTATTGGTTTCGGTAATGCTGAAATTGGACAGCAGGTTGATAATTTCTGGTTGGTAGGACCATTAAAGGTTACGCCTATTCAAGAGGTAGAGTTTGTTTCCCAATTAGCACATACACAGCTTCCATTTAGTGAAAAAGTGCAGGCTAATGTAAAAAATATGCTTCTTTTAGAAGAGAGTAATGGCTACAAAATTTTTGGAAAGACTGGTTGGGCAATGGATATAAAACCACAAGTGGGCTGGTTGACCGGCTGGGTTGAGCAGCCAGATGGAAAAATTGTCGCTTTTGCATTAAATATGGAAATGCGGTCAGAAATGCCGGCATCTATACGTAATGAATTATTGATGAAATCATTAAAACAGCTGAATATTATT",
    },
  ];
  return (
    <>
      {blastnInfo && Object.keys(blastnInfo).length > 0 && (
        <div
          style={{
            marginBottom: "12px",
            color: "#1e293b",
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div>
              <strong>{t("resultPage.filename")}:</strong> {blastnInfo.filename}
            </div>
            <div>
              <strong>{t("resultPage.createdAt")}:</strong>{" "}
              {formatDateVN(blastnInfo.createdAt)}
            </div>
          </div>
        </div>
      )}
      <Table>
        <thead>
          <tr>
            <Th>{t("resultPage.tableHeaders.index")}</Th>
            <Th>{t("resultPage.tableHeaders.name")}</Th>
            <Th>{t("resultPage.tableHeaders.bacteria")}</Th>
            <Th>{t("resultPage.tableHeaders.avgIdentity")}</Th>
            <Th>{t("resultPage.tableHeaders.bitScore")}</Th>
            <Th>{t("resultPage.tableHeaders.alignmentLength")}</Th>
            <Th>{t("resultPage.tableHeaders.mismatches")}</Th>
            <Th>{t("resultPage.tableHeaders.gapOpens")}</Th>
            <Th>{t("resultPage.tableHeaders.coverage")}</Th>
            <Th>{t("resultPage.tableHeaders.detail")}</Th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr>
              <Td colSpan={9} style={{ textAlign: "center" }}>
                {t("resultPage.noData")}
              </Td>
            </tr>
          ) : (
            paginatedResults.map((r, idx) => {
              const info = findInfoByName(r.name);
              const bacteria = info?.bacteria || "-";
              const ncbiUrl = info?.ncbiUrl;

              return (
                <Tr key={idx}>
                  <Td>
                    {(currentPage - 1) *
                      (rowsPerPage === "all" ? results.length : rowsPerPage) +
                      idx +
                      1}
                  </Td>
                  <Td>{r.name}</Td>
                  <Td>
                    {ncbiUrl ? (
                      <a
                        href={ncbiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {bacteria}
                      </a>
                    ) : (
                      bacteria
                    )}
                  </Td>
                  <Td>{r.result.avgIdentity}</Td>
                  <Td>{r.result.avgBitScore}</Td>
                  <Td>{r.result.avgAlignmentLength}</Td>
                  <Td>{r.result.avgMismatch}</Td>
                  <Td>{r.result.avgGapOpens}</Td>
                  <Td>{r.result.avgCoverage}</Td>
                  <Td>
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "1.8rem",
                        userSelect: "none",
                      }}
                      onClick={() =>
                        handleViewDetails(blastnInfo.url, r.name, r, bacteria)
                      }
                      title={t("resultPage.viewDetails")}
                    >
                      👁️
                    </span>
                  </Td>
                </Tr>
              );
            })
          )}
        </tbody>
      </Table>
      {isLoading && (
        <div style={{ marginTop: "200px" }}>
          <LoadingSpinner />
        </div>
      )}
      {showModal && (
        <>
          <BlastnModal
            blastn={blastnData}
            onClose={() => setShowModal(false)}
            info={modalInfo}
            bacteria={bacteriaInfo}
            amr={sampleAMR}
          />
        </>
      )}
      {results.length > 0 && (
        <PaginationWrapper>
          <div>
            {t("resultPage.rowsPerPage")}:{" "}
            <Select value={rowsPerPage} onChange={handleRowsChange}>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">{t("resultPage.all")}</option>
            </Select>
          </div>

          {rowsPerPage !== "all" && (
            <PageControls>
              <PageButton
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {t("resultPage.prev")}
              </PageButton>
              {[...Array(totalPages)].map((_, index) => (
                <PageButton
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  active={(currentPage === index + 1).toString()}
                >
                  {index + 1}
                </PageButton>
              ))}
              <PageButton
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {t("resultPage.next")}
              </PageButton>
            </PageControls>
          )}
        </PaginationWrapper>
      )}
    </>
  );
};

export default ResultTable;
