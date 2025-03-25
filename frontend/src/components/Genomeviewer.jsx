import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1``;
const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #f3f3f3;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const Circle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #737373;
  border-radius: 50%;
  display: flex;
  color: white;
  font-size: 32px;
  justify-content: center;
  align-items: center;
`;
const Chart = styled.div`
  width: 100%;
  overflow: hidden;
`;
const Tooltip = styled.div`
  position: absolute;
  background: white;
  border: 1px solid gray;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.visible ? "block" : "none")};
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  min-width: 150px;
  user-select: none;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 1px;
  /* color: white; */
  border: #000000;
  padding: 2px 6px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
`;
const dataFetched = [
  {
    genome: {
      genus: null,
      species: null,
      strain: null,
      taxon: null,
      complete: true,
      gram: "+",
      translation_table: 11,
    },
    stats: {
      size: 3306,
      gc: 0.4340592861464005,
      n_ratio: 0.0,
      n50: 3306,
      n90: 3306,
      coding_ratio: 0.7522686025408348,
    },
    features: [
      {
        type: "cds",
        sequence: "contig_1",
        start: 2,
        stop: 736,
        strand: "+",
        frame: 2,
        gene: "mobA",
        product: "plasmid mobilization protein MobA",
        db_xrefs: [
          "GO:0006355",
          "SO:0001217",
          "UniRef:UniRef50_G4VUV6",
          "UniRef:UniRef90_G4VUV6",
        ],
        nt: "TCTTCTGCGAGTTCGTGCAGCTTCTCACACATGGTGGCCTGCTCGTCAGCATCGAGTGCGTCCAGTTTTTCGAGCAGCGTCAGGCTCTGGCTTTTTATGAATCCCGCCATGTTGAGTGCAGTTTGCTGCTGCTTGTTCATCTTTCTGTTTTCTCCGTTCTGTCTGTCATCTGCGTCGTGTGATTATATCGCGCACCACTTTTCGACCGTCTTACCGCCGGTATTCTGCCGACGGACATTTCAGTCAGACAACACTGTCACTGCCAAAAAACAGCAGTGCTTTGTTGGTAATTCGAACTTGCAGACAGGACAGGATGTGCAATTGTTATACCGCGCATACATGCACGCTATTACAATTACCCTGGTCAGGGCTTCGCCCCGACACCCCATGTCAGATACGGAGCCATGTTTTATGACAAAACGAAGTGGAAGTAATACGCGCAGGCGGGCTATCAGTCGCCCTGTTCGTCTGACGGCAGAAGAAGACCAGGAAATCAGAAAAAGGGCTGCTGAATGCGGCAAGACCGTTTCTGGTTTTTTACGGGCGGCAGCTCTCGGTAAGAAAGTTAACTCACTGACTGATGACCGGGTGCTGAAAGAAGTTATGCGACTGGGGGCGTTGCAGAAAAAACTCTTTATCGACGGCAAGCGTGTCGGGGACAGAGAGTATGCGGAGGTGCTGATCGCTATTACGGAGTATCACCGTGCCCTGTTATCCAGGCTTATGGCAGATTAG",
        aa: "SSASSCSFSHMVACSSASSASSFSSSVRLWLFMNPAMLSAVCCCLFIFLFSPFCLSSASCDYIAHHFSTVLPPVFCRRTFQSDNTVTAKKQQCFVGNSNLQTGQDVQLLYRAYMHAITITLVRASPRHPMSDTEPCFMTKRSGSNTRRRAISRPVRLTAEEDQEIRKRAAECGKTVSGFLRAAALGKKVNSLTDDRVLKEVMRLGALQKKLFIDGKRVGDREYAEVLIAITEYHRALLSRLMAD",
        aa_hexdigest: "bbb582b0498d5635f931d45732cbfcbb",
        start_type: "Edge",
        rbs_motif: null,
        truncated: "5-prime",
        psc: {
          uniref90_id: "UniRef90_G4VUV6",
          query_cov: 1.0,
          subject_cov: 0.8970588235294118,
          identity: 0.992,
          score: 462.0,
          evalue: 8.07e-164,
          valid: true,
          gene: "mobA",
          product: "plasmid mobilization protein MobA",
          uniref50_id: "UniRef50_G4VUV6",
          go_ids: ["GO:0006355"],
        },
        pscc: {
          uniref50_id: "UniRef50_G4VUV6",
          db_xrefs: ["SO:0001217", "UniRef:UniRef50_G4VUV6"],
          product: "Plasmid mobilization protein",
        },
        genes: ["mobA"],
        id: "DOGAIAIOFN_4",
        locus: "DOGAIA_01",
      },
      {
        type: "oriT",
        sequence: "contig_1",
        start: 179,
        stop: 404,
        strand: "?",
        product: "origin of transfer",
        nt: "TGTGATTATATCGCGCACCACTTTTCGACCGTCTTACCGCCGGTATTCTGCCGACGGACATTTCAGTCAGACAACACTGTCACTGCCAAAAAACAGCAGTGCTTTGTTGGTAATTCGAACTTGCAGACAGGACAGGATGTGCAATTGTTATACCGCGCATACATGCACGCTATTACAATTACCCTGGTCAGGGCTTCGCCCCGACACCCCATGTCAGATACGGAGC",
        id: "DOGAIAIOFN_5",
      },
      {
        type: "cds",
        sequence: "contig_1",
        start: 971,
        stop: 1351,
        strand: "-",
        frame: 3,
        gene: "lsoB",
        product: "type II toxin-antitoxin system antitoxin LsoB",
        db_xrefs: [
          "BlastRules:WP_000710826",
          "RefSeq:WP_000710826.1",
          "SO:0001217",
          "UniParc:UPI00000BEEC7",
          "UniRef:UniRef100_Q7DKW4",
          "UniRef:UniRef50_Q7DKW4",
          "UniRef:UniRef90_Q7DKW4",
        ],
        nt: "ATGAAAAAAGATAAAAAATATCAAATAGAAGCAATAAAAAATAAAGATAAAACTTTATTTATTGTCTATGCTACTGATATTTATAGCCCGAGCGAATTTTTCTCAAAAATCGAATCCGACTTGAAGAAAAAGAAAAGCAAGGGTGATGTTTTTTTTGATTTAATAATTCCTAACGGTGGAAAAAAAGATCGTTACGTCTATACGTCATTTAATGGCGAGAAGTTTTCAAGTTACACATTAAACAAAGTTACGAAAACTGATGAATATAATGATTTATCTGAGCTCTCGGCTTCGTTCTTTAAAAAAAACTTTGATAAGATCAACGTAAACCTTCTATCCAAAGCCACATCATTTGCTTTGAAAAAAGGCATTCCAATATAA",
        aa: "MKKDKKYQIEAIKNKDKTLFIVYATDIYSPSEFFSKIESDLKKKKSKGDVFFDLIIPNGGKKDRYVYTSFNGEKFSSYTLNKVTKTDEYNDLSELSASFFKKNFDKINVNLLSKATSFALKKGIPI",
        aa_hexdigest: "ed7e6002701269c907bf57f264e763c1",
        start_type: "ATG",
        rbs_motif: "GGA/GAG/AGG",
        ups: {
          uniparc_id: "UPI00000BEEC7",
          ncbi_nrp_id: "WP_000710826.1",
          uniref100_id: "UniRef100_Q7DKW4",
          db_xrefs: [
            "SO:0001217",
            "UniParc:UPI00000BEEC7",
            "RefSeq:WP_000710826.1",
            "UniRef:UniRef100_Q7DKW4",
          ],
        },
        ips: {
          uniref100_id: "UniRef100_Q7DKW4",
          uniref90_id: "UniRef90_Q7DKW4",
        },
        psc: {
          uniref90_id: "UniRef90_Q7DKW4",
          gene: "lsoB",
          product: "Antitoxin LsoB",
          uniref50_id: "UniRef50_Q7DKW4",
        },
        pscc: {
          uniref50_id: "UniRef50_Q7DKW4",
          db_xrefs: ["SO:0001217", "UniRef:UniRef50_Q7DKW4"],
          product: "Antitoxin LsoB",
        },
        expert: [
          {
            type: "expert_proteins",
            source: "BlastRules",
            rank: 80,
            id: "WP_000710826",
            gene: "lsoB",
            product: "type II toxin-antitoxin system antitoxin LsoB",
            query_cov: 1.0,
            subject_cov: 1.0,
            identity: 1.0,
            score: 245.0,
            evalue: 6.31e-86,
            db_xrefs: ["BlastRules:WP_000710826"],
          },
        ],
        genes: ["lsoB"],
        id: "DOGAIAIOFN_2",
        locus: "DOGAIA_02",
      },
      {
        type: "cds",
        sequence: "contig_1",
        start: 1348,
        stop: 2388,
        strand: "-",
        frame: 1,
        gene: "lsoA",
        product: "type II toxin-antitoxin system mRNA endoribonuclease LsoA",
        db_xrefs: [
          "BlastRules:WP_000068433",
          "EC:3.1.-.-",
          "GO:0004521",
          "RefSeq:WP_000068433.1",
          "SO:0001217",
          "UniParc:UPI00000B51BA",
          "UniRef:UniRef100_O82881",
          "UniRef:UniRef50_O82881",
          "UniRef:UniRef90_O82881",
        ],
        nt: "ATGGCACAGAACCCGTTTAAAGCACTAAATATCAATATTGACAAGATTGAGTCTGCTCTGACGCAGAATGGCGTCACAAACTATTCCTCTAATGTAAAAAACGAAAGAGAAACTCACATATCTGGCACATATAAAGGAATAGACTTCTTAATAAAACTAATGCCATCAGGCGGAAATACCACTATCGGAAGAGCGTCTGGGCAAAATAACACTTACTTTGATGAAATCGCCTTGATTATAAAAGAAAACTGTTTGTATTCAGACACAAAGAACTTTGAATACACCATTCCAAAATTCAGTGATGATGACAGGGCAAATCTATTTGAATTTCTTTCTGAAGAGGGGATAACAATAACAGAAGATAATAATAACGATCCTAATTGTAAACACCAATATATTATGACCACCAGCAATGGTGACAGGGTCAGGGCAAAAATTTACAAGCGCGGCTCTATTCAATTCCAAGGAAAATACCTTCAAATCGCGAGTTTGATTAACGATTTCATGTGCTCAATACTAAACATGAAAGAGATTGTCGAACAAAAAAATAAAGAATTTAATGTTGACATAAAAAAAGAAACTATTGAGTCCGAGTTGCATAGCAAACTACCAAAAAGCATCGATAAAATCCATGAAGATATCAAAAAACAGCTATCATGCTCGCTAATAATGAAAAAAATAGATGTCGAAATGGAAGATTACTCAACATACTGCTTCTCTGCATTAAGAGCCATAGAAGGCTTTATATATCAAATACTTAATGATGTTTGCAATCCATCATCATCAAAGAACCTTGGCGAATACTTCACTGAAAACAAACCCAAATATATAATCAGAGAAATACACCAAGAAACTATAAATGGTGAAATAGCGGAAGTTTTGTGTGAATGCTACACTTACTGGCATGAGAACAGGCATGGTTTGTTTCATATGAAACCAGGAATAGCTGACACGAAGACAATTAACAAATTAGAATCAATCGCAATCATCGATACCGTTTGCCAATTAATAGATGGTGGCGTAGCTAGGTTGAAATTATGA",
        aa: "MAQNPFKALNINIDKIESALTQNGVTNYSSNVKNERETHISGTYKGIDFLIKLMPSGGNTTIGRASGQNNTYFDEIALIIKENCLYSDTKNFEYTIPKFSDDDRANLFEFLSEEGITITEDNNNDPNCKHQYIMTTSNGDRVRAKIYKRGSIQFQGKYLQIASLINDFMCSILNMKEIVEQKNKEFNVDIKKETIESELHSKLPKSIDKIHEDIKKQLSCSLIMKKIDVEMEDYSTYCFSALRAIEGFIYQILNDVCNPSSSKNLGEYFTENKPKYIIREIHQETINGEIAEVLCECYTYWHENRHGLFHMKPGIADTKTINKLESIAIIDTVCQLIDGGVARLKL",
        aa_hexdigest: "f38c7538741cc7996a5564ff430abad7",
        start_type: "ATG",
        rbs_motif: "GGA/GAG/AGG",
        ups: {
          uniparc_id: "UPI00000B51BA",
          ncbi_nrp_id: "WP_000068433.1",
          uniref100_id: "UniRef100_O82881",
          db_xrefs: [
            "SO:0001217",
            "UniParc:UPI00000B51BA",
            "RefSeq:WP_000068433.1",
            "UniRef:UniRef100_O82881",
          ],
        },
        ips: {
          uniref100_id: "UniRef100_O82881",
          uniref90_id: "UniRef90_O82881",
        },
        psc: {
          uniref90_id: "UniRef90_O82881",
          gene: "lsoA",
          product: "mRNA endoribonuclease LsoA",
          ec_ids: ["3.1.-.-"],
          uniref50_id: "UniRef50_O82881",
          go_ids: ["GO:0004521"],
        },
        pscc: {
          uniref50_id: "UniRef50_O82881",
          db_xrefs: ["SO:0001217", "UniRef:UniRef50_O82881"],
          product: "mRNA endoribonuclease LsoA",
        },
        expert: [
          {
            type: "expert_proteins",
            source: "BlastRules",
            rank: 80,
            id: "WP_000068433",
            gene: "lsoA",
            product:
              "type II toxin-antitoxin system mRNA endoribonuclease LsoA",
            query_cov: 1.0,
            subject_cov: 1.0,
            identity: 1.0,
            score: 693.0,
            evalue: 9.18e-256,
            db_xrefs: ["BlastRules:WP_000068433"],
          },
        ],
        genes: ["lsoA"],
        id: "DOGAIAIOFN_3",
        locus: "DOGAIA_03",
      },
      {
        type: "ncRNA",
        class: null,
        sequence: "contig_1",
        start: 2495,
        stop: 2598,
        strand: "-",
        gene: "RNAI",
        product: "RNAI",
        score: 83.3,
        evalue: 4.3e-14,
        db_xrefs: ["RFAM:RF00106", "SO:0000655"],
        nt: "AGATTTTGGTGACTGCGCTCCTCCAAGCCAGTTACCTTGGTTCAAAGAGTTGGTAGCTCAGCGAACCTTGAGAAAACCACCGTTGGTAGCGGTGGTTTTTCTTT",
        id: "DOGAIAIOFN_1",
        locus: "DOGAIA_04",
      },
    ],
    sequences: [
      {
        id: "contig_1",
        description:
          "[gcode=11] [completeness=complete] [topology=circular] [location=chromosome]",
        nt: "TTCTTCTGCGAGTTCGTGCAGCTTCTCACACATGGTGGCCTGCTCGTCAGCATCGAGTGCGTCCAGTTTTTCGAGCAGCGTCAGGCTCTGGCTTTTTATGAATCCCGCCATGTTGAGTGCAGTTTGCTGCTGCTTGTTCATCTTTCTGTTTTCTCCGTTCTGTCTGTCATCTGCGTCGTGTGATTATATCGCGCACCACTTTTCGACCGTCTTACCGCCGGTATTCTGCCGACGGACATTTCAGTCAGACAACACTGTCACTGCCAAAAAACAGCAGTGCTTTGTTGGTAATTCGAACTTGCAGACAGGACAGGATGTGCAATTGTTATACCGCGCATACATGCACGCTATTACAATTACCCTGGTCAGGGCTTCGCCCCGACACCCCATGTCAGATACGGAGCCATGTTTTATGACAAAACGAAGTGGAAGTAATACGCGCAGGCGGGCTATCAGTCGCCCTGTTCGTCTGACGGCAGAAGAAGACCAGGAAATCAGAAAAAGGGCTGCTGAATGCGGCAAGACCGTTTCTGGTTTTTTACGGGCGGCAGCTCTCGGTAAGAAAGTTAACTCACTGACTGATGACCGGGTGCTGAAAGAAGTTATGCGACTGGGGGCGTTGCAGAAAAAACTCTTTATCGACGGCAAGCGTGTCGGGGACAGAGAGTATGCGGAGGTGCTGATCGCTATTACGGAGTATCACCGTGCCCTGTTATCCAGGCTTATGGCAGATTAGCTTCCCGGAGAGAAACTGTCGAAAACAGACGGTATGAACGCCGTAAGCCCCCAAACCGATCGCCATTCACTTTCATGCATAGCTATGCAGTGAGCTGAAAGCGATCCTGACGCATTTTTCCGGTTTACCCCGGGGAAAACATCTCTTTTTGCGGTGTCTGCGTCAGAATCGCGTTCAGCGCGTTTTGGCGGTGCGCGTAATGAGACGTTATGGTAAATGTCTTCTGGCTTGATATTATATTGGAATGCCTTTTTTCAAAGCAAATGATGTGGCTTTGGATAGAAGGTTTACGTTGATCTTATCAAAGTTTTTTTTAAAGAACGAAGCCGAGAGCTCAGATAAATCATTATATTCATCAGTTTTCGTAACTTTGTTTAATGTGTAACTTGAAAACTTCTCGCCATTAAATGACGTATAGACGTAACGATCTTTTTTTCCACCGTTAGGAATTATTAAATCAAAAAAAACATCACCCTTGCTTTTCTTTTTCTTCAAGTCGGATTCGATTTTTGAGAAAAATTCGCTCGGGCTATAAATATCAGTAGCATAGACAATAAATAAAGTTTTATCTTTATTTTTTATTGCTTCTATTTGATATTTTTTATCTTTTTTCATAATTTCAACCTAGCTACGCCACCATCTATTAATTGGCAAACGGTATCGATGATTGCGATTGATTCTAATTTGTTAATTGTCTTCGTGTCAGCTATTCCTGGTTTCATATGAAACAAACCATGCCTGTTCTCATGCCAGTAAGTGTAGCATTCACACAAAACTTCCGCTATTTCACCATTTATAGTTTCTTGGTGTATTTCTCTGATTATATATTTGGGTTTGTTTTCAGTGAAGTATTCGCCAAGGTTCTTTGATGATGATGGATTGCAAACATCATTAAGTATTTGATATATAAAGCCTTCTATGGCTCTTAATGCAGAGAAGCAGTATGTTGAGTAATCTTCCATTTCGACATCTATTTTTTTCATTATTAGCGAGCATGATAGCTGTTTTTTGATATCTTCATGGATTTTATCGATGCTTTTTGGTAGTTTGCTATGCAACTCGGACTCAATAGTTTCTTTTTTTATGTCAACATTAAATTCTTTATTTTTTTGTTCGACAATCTCTTTCATGTTTAGTATTGAGCACATGAAATCGTTAATCAAACTCGCGATTTGAAGGTATTTTCCTTGGAATTGAATAGAGCCGCGCTTGTAAATTTTTGCCCTGACCCTGTCACCATTGCTGGTGGTCATAATATATTGGTGTTTACAATTAGGATCGTTATTATTATCTTCTGTTATTGTTATCCCCTCTTCAGAAAGAAATTCAAATAGATTTGCCCTGTCATCATCACTGAATTTTGGAATGGTGTATTCAAAGTTCTTTGTGTCTGAATACAAACAGTTTTCTTTTATAATCAAGGCGATTTCATCAAAGTAAGTGTTATTTTGCCCAGACGCTCTTCCGATAGTGGTATTTCCGCCTGATGGCATTAGTTTTATTAAGAAGTCTATTCCTTTATATGTGCCAGATATGTGAGTTTCTCTTTCGTTTTTTACATTAGAGGAATAGTTTGTGACGCCATTCTGCGTCAGAGCAGACTCAATCTTGTCAATATTGATATTTAGTGCTTTAAACGGGTTCTGTGCCATTGGGTCAATCCGTTGTTTTTTTTGAATATGTACAGATCTTGTTTTTTTGTCAACGGAATAGCTGTTCGTTGACTTGATAGACCGATTGATTCATCATCTCATAAATAAAGAAAAACCACCGCTACCAACGGTGGTTTTCTCAAGGTTCGCTGAGCTACCAACTCTTTGAACCAAGGTAACTGGCTTGGAGGAGCGCAGTCACCAAAATCTGTTCTTTCAGTTTAGCCTTAACAGGTGCATAACTTCAAGACAAACTCCTCTAAATCAGTTACCAATGGCTGCTGCCAGTGGCGATAAGTCGTGTCTTACCGGGTTGGACTCAAGACGATAGTTACCGGATAAGGCGCAGCGGTCGGGCTGAACGGGGGGTTCGTGCACACAGCCCAGCTTGGAGCGAACGACCTACACCGAACTGAGATACCAACAGCGTGAGCTATGAGAAAGCGCCACGCTTCCCGAAGGGAGAAAGGCGGACAGGTATCCGGTAAGTGGCAGGGTCGGAACAGGAGAGCGCACGAGGGAGCTTCCGGGGGGAAACGCCTGGTATCTTTATAGTCCTGTCGGGTTTCGCCACCTCTGGCTTGAGCGTCGATTTTTGTGATGCTCGTCAGGGGGGCGGAGCCTATGGAAAAACGCCTGCGGTGCTGGCTTCTTCCGGTGCTTTGCTTTTTGCTCACATGTTCTTTCCGGCTTTATCCCCTGATTCTGTGGATAACCGTATTACCGCCTTTGAGTGAGCTGACACCGCTCGCCGCAGTCGAACGACCGAGCGTAGCGAGTCAGTGAGCGAGGAAGCGGAAGAGCGCCTTATGTGACATTTTCTCCTTACGCTCTGTTGTGCCGTTCGGCATCCTGCCCTGAGCGTTATATCTCTGTGCTATTTTCTACTTCAAAGCGTGTCTGTATGCTGTTCTGGAG",
        length: 3306,
        complete: true,
        type: "chromosome",
        topology: "circular",
        orig_id: "NC_002127.1",
        orig_description:
          "Escherichia coli O157:H7 str. Sakai plasmid pOSAK1, complete sequence",
      },
    ],
    run: {
      start: "2025-03-12 05:22:59",
      end: "2025-03-12 05:25:11",
      duration: "2.20 min",
    },
    version: {
      bakta: "1.11.0",
      db: {
        version: "6.0",
        type: "full",
      },
    },
  },
];
const Genome = ({ w, h }) => {
  const [tooltips, setTooltips] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  console.log(dataFetched);
  const sequence = dataFetched[0].sequences[0].nt;
  const colors = { A: "green", T: "red", G: "orange", C: "blue" };
  const totalNu = sequence.length;
  const viewWidth = 1300;
  const rectHeight = 30;
  const svgRef = useRef();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3000);
  const [elements, setElements] = useState([]);
  const [widthNu, setWidthNu] = useState(viewWidth / sequence.length);
  useEffect(() => {
    const newElements = Array.from(sequence).map((nucleotide, i) => ({
      nucleotide,
      color: colors[nucleotide] || "black",
    }));
    setElements(newElements);
  }, [sequence]);

  const updateView = () => {
    const zoomLevel = totalNu / (end - start);
    setWidthNu(viewWidth / (end - start));
    console.log(zoomLevel);
    document.getElementById("zoom").value = Math.round(zoomLevel);
  };
  useEffect(() => {
    const rect = document.getElementById("rect");
    const text = document.getElementById("text");
    if (end - start < 100) {
      rect.style.display = "none";
      text.style.display = "block";
    } else {
      rect.style.display = "block";
      text.style.display = "none";
    }
  }, [end]);
  const handleZoomChange = (event) => {
    const zoom = parseInt(event.target.value);
    const length = Math.floor(totalNu / zoom);
    const newEnd = Math.min(start + length, totalNu);
    setEnd(newEnd);
  };

  const first = () => {
    return elements.slice(start, end).map((element, index) => {
      const nucleotideWidth = viewWidth / (end - start);
      const x = index * nucleotideWidth;
      return (
        <g key={index}>
          <rect
            x={x}
            y={50}
            width={nucleotideWidth}
            height={rectHeight}
            fill={element.color}
          />
        </g>
      );
    });
  };

  const zoomIn = () => {
    return elements.slice(start, end).map((element, index) => {
      const nucleotideWidth = viewWidth / (end - start);
      const x = index * nucleotideWidth;

      return (
        <g key={index}>
          <text
            x={x + nucleotideWidth / 2}
            y={50}
            fill={element.color}
            fontSize="12"
            textAnchor="middle"
          >
            {element.nucleotide}
          </text>
        </g>
      );
    });
  };
  const labels = [];
  let minstep;

  if (end - start < 300) {
    minstep = 10;
  } else if (end - start < 1000) {
    minstep = 100;
  } else {
    minstep = 500;
  }

  let minNu = Math.ceil(start / minstep) * minstep;

  for (let i = minNu; i <= end; i += minstep) {
    labels.push(i);
  }

  const sortedFeatures = [...dataFetched[0].features].sort(
    (a, b) => a.start - b.start
  );

  const layersByType = {};
  let currId = 1;
  sortedFeatures.forEach((item) => {
    if (!layersByType[item.type]) {
      layersByType[item.type] = [];
    }
    let assignedLayer = 0;
    const lastItem =
      layersByType[item.type][layersByType[item.type].length - 1];
    if (lastItem && lastItem.stop > item.start) {
      assignedLayer = lastItem.layer + 1;
    }

    layersByType[item.type].push({
      id: currId,
      layer: assignedLayer,
      start: item.start,
      stop: item.stop,
      product: item.product,
      location: item.sequence,
      locus: item.locus,
      gene: item.gene,
      strand: item.strand,
    });
    currId++;
  });

  const typeColors = {
    cds: "#D6AADF",
    tRNA: "#b2df8a",
    tmRNA: "#b2df8a",
    rRNA: "#fb8072",
    ncRNA: "#640000",
    "ncRNA-region": "#80b1d3",
    CRISPR: "#bebada",
    Gap: "#000000",
    Misc: "#666666",
    oriT: "#640000",
  };
  const cdsType = ["cds", "sORF"];
  const tRNAType = ["tRNA", "tmRNA", "rRNA"];
  const ncRNAType = ["ncRNA"];
  const ncRNAregionType = ["ncRNA-region"];
  const CRISPRType = ["CRISPR"];
  const GapType = ["Gap"];
  const oriCType = ["oriC", "oriT", "oriV"];
  let remove = 0;
  let curr = 30;

  const handleClick = (e, item, type, id) => {
    setTooltips((prev) => {
      if (prev.some((tooltip) => tooltip.id === id)) return prev;
      return [
        ...prev,
        {
          id,
          x: e.clientX,
          y: e.clientY + window.scrollY,
          data: { ...item, type },
        },
      ];
    });
  };
  const handleMouseDown = (e, id) => {
    setDraggingId(id);
    setOffset({
      x: e.clientX - e.target.getBoundingClientRect().left,
      y: e.clientY - e.target.getBoundingClientRect().top,
    });
  };
  const handleMouseMove = (e) => {
    if (!draggingId) return;
    setTooltips((prev) =>
      prev.map((tooltip) =>
        tooltip.id === draggingId
          ? {
              ...tooltip,
              x: e.clientX - offset.x,
              y: e.clientY + window.scrollY - offset.y,
            }
          : tooltip
      )
    );
  };
  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleClose = (id) => {
    setTooltips((prev) => prev.filter((tooltip) => tooltip.id !== id));
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingId]);
  const cds = () => {
    {
      return (
        <>
          {cdsType.map((type) =>
            layersByType[type]?.map((item, index) => (
              <g
                onClick={(e) => handleClick(e, item, type, item.id)}
                transform={`translate(${-(start * widthNu)}, 0)`}
                key={`${type}-${index}`}
              >
                <rect
                  key={`${type}-${index}`}
                  x={item.start * widthNu}
                  y={110 + item.layer * 40}
                  height={20}
                  width={(item.stop - item.start) * widthNu}
                  fill={typeColors[type] || "#999999"}
                />
                <text
                  x={((item.start + item.stop) / 2) * widthNu}
                  y={110 + item.layer * 40 + 32}
                  fontSize={10}
                  textAnchor="middle"
                  fill={typeColors[type] || "#999999"}
                >
                  {item.product}
                </text>
              </g>
            ))
          )}
        </>
      );
    }
  };
  const tRNA = () => {
    {
      return (
        <>
          {tRNAType.map((type) =>
            layersByType[type]?.map((item, index) => (
              <g
                onClick={(e) => handleClick(e, item, type, item.id)}
                transform={`translate(${-(start * widthNu)}, 0)`}
                key={`${type}-${index}`}
              >
                {" "}
                <rect
                  key={`${type}-${index}`}
                  x={item.start * widthNu}
                  y={200 + item.layer * 40 - remove * 90}
                  height={20}
                  width={(item.stop - item.start) * widthNu}
                  fill={typeColors[type] || "#999999"}
                />
                <text
                  x={((item.start + item.stop) / 2) * widthNu}
                  y={200 + item.layer * 40 + 32 - remove * 90}
                  fontSize={8}
                  textAnchor="middle"
                  fill={typeColors[type] || "#999999"}
                >
                  {item.product}
                </text>
              </g>
            ))
          )}
        </>
      );
    }
  };
  const ncRNA = () => {
    {
      return (
        <>
          {ncRNAType.map((type) =>
            layersByType[type]?.map((item, index) => (
              <g
                onClick={(e) => handleClick(e, item, type, item.id)}
                transform={`translate(${-(start * widthNu)}, 0)`}
                key={`${type}-${index}`}
              >
                <rect
                  key={`${type}-${index}`}
                  x={item.start * widthNu}
                  y={290 + item.layer * 40 - remove * 90}
                  height={20}
                  width={(item.stop - item.start) * widthNu}
                  fill={typeColors[type] || "#999999"}
                />
                <text
                  x={((item.start + item.stop) / 2) * widthNu}
                  y={290 + item.layer * 40 + 32 - remove * 90}
                  fontSize={8}
                  textAnchor="middle"
                  fill={typeColors[type] || "#999999"}
                >
                  {item.product}
                </text>
              </g>
            ))
          )}
        </>
      );
    }
  };
  const ncRNAregion = () => {
    {
      return (
        <>
          {ncRNAregionType.map((type) =>
            layersByType[type]?.map((item, index) => (
              <g
                onClick={(e) => handleClick(e, item, type, item.id)}
                transform={`translate(${-(start * widthNu)}, 0)`}
                key={`${type}-${index}`}
              >
                {" "}
                <rect
                  key={`${type}-${index}`}
                  x={item.start * widthNu}
                  y={380 + item.layer * 40 - remove * 90}
                  height={20}
                  width={(item.stop - item.start) * widthNu}
                  fill={typeColors[type] || "#999999"}
                />
                <text
                  x={((item.start + item.stop) / 2) * widthNu}
                  y={380 + item.layer * 40 + 30 - remove * 90}
                  fontSize={8}
                  textAnchor="middle"
                  fill={typeColors[type] || "#999999"}
                >
                  {item.product}
                </text>
              </g>
            ))
          )}
        </>
      );
    }
  };
  const CRISPR = () => {
    {
      return (
        <>
          {CRISPRType.map((type) =>
            layersByType[type]?.map((item, index) => (
              <g
                onClick={(e) => handleClick(e, item, type, item.id)}
                transform={`translate(${-(start * widthNu)}, 0)`}
                key={`${type}-${index}`}
              >
                <rect
                  key={`${type}-${index}`}
                  x={item.start * widthNu}
                  y={470 - remove * 90 + item.layer * 40}
                  height={20}
                  width={(item.stop - item.start) * widthNu}
                  fill={typeColors[type] || "#999999"}
                />
                <text
                  x={((item.start + item.stop) / 2) * widthNu}
                  y={470 - remove * 90 + item.layer * 40 + 32}
                  fontSize={8}
                  textAnchor="middle"
                  fill={typeColors[type] || "#999999"}
                >
                  {item.product}
                </text>
              </g>
            ))
          )}
        </>
      );
    }
  };
  const Gap = () => {
    {
      return (
        <>
          {GapType.map((type) =>
            layersByType[type]?.map((item, index) => (
              <g
                onClick={(e) => handleClick(e, item, type, item.id)}
                transform={`translate(${-(start * widthNu)}, 0)`}
                key={`${type}-${index}`}
              >
                {" "}
                <rect
                  key={`${type}-${index}`}
                  x={item.start * widthNu}
                  y={560 - remove * 90 + item.layer * 40}
                  height={20}
                  width={(item.stop - item.start) * widthNu}
                  fill={typeColors[type] || "#999999"}
                />
                <text
                  x={((item.start + item.stop) / 2) * widthNu}
                  y={560 - remove * 90 + item.layer * 40 + 32}
                  fontSize={8}
                  textAnchor="middle"
                  fill={typeColors[type] || "#999999"}
                >
                  {item.product}
                </text>
              </g>
            ))
          )}
        </>
      );
    }
  };
  const oriC = () => {
    {
      return (
        <>
          {oriCType.map((type) =>
            layersByType[type]?.map((item, index) => (
              <g
                onClick={(e) => handleClick(e, item, type, item.id)}
                transform={`translate(${-(start * widthNu)}, 0)`}
                key={`${type}-${index}`}
              >
                <rect
                  key={`${type}-${index}`}
                  x={item.start * widthNu}
                  y={650 - remove * 90 + item.layer * 40}
                  height={20}
                  width={(item.stop - item.start) * widthNu}
                  fill={typeColors[type] || "#999999"}
                />
                <text
                  key={`text${type}-${index}`}
                  x={((item.start + item.stop) / 2) * widthNu}
                  y={650 - remove * 90 + item.layer * 40 + 32}
                  fontSize={8}
                  textAnchor="middle"
                  fill={typeColors[type] || "#999999"}
                >
                  {item.product}
                </text>
              </g>
            ))
          )}
        </>
      );
    }
  };
  const handleStartChange = (e) => {
    const value = Math.max(
      0,
      Math.min(sequence.length, Number(e.target.value))
    );
    setStart(value);
    setEnd(Math.max(value + 40, end));
  };

  const handleEndChange = (e) => {
    const value = Math.max(
      start + 40,
      Math.min(sequence.length, Number(e.target.value))
    );
    setEnd(value);
  };
  return (
    <Container>
      <Menu>
        <div>
          <label htmlFor="start" style={{ marginRight: "5px" }}>
            Start:
          </label>
          <input
            type="number"
            id="start"
            min="0"
            max={sequence.length - 40}
            value={start}
            onChange={(e) => handleStartChange(e)}
          />
          <label
            htmlFor="end"
            style={{ marginLeft: "20px", marginRight: "5px" }}
          >
            End:
          </label>
          <input
            type="number"
            id="end"
            min="40"
            max={sequence.length}
            value={end}
            onChange={(e) => handleEndChange(e)}
          />
          <button
            onClick={updateView}
            style={{
              marginLeft: "20px",
              backgroundColor: "#4781ff",
              color: "white",
              padding: "2px 10px",
              borderRadius: "2px",
              border: "none",
            }}
          >
            Search
          </button>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <Circle>-</Circle>
          <input
            type="range"
            id="zoom"
            min="1"
            max="100"
            defaultValue="1"
            step="1"
            onChange={handleZoomChange}
          />
          <Circle>+</Circle>
        </div>
      </Menu>

      <Chart>
        <svg
          id="dna-viewer"
          style={{ width: "100%", minHeight: "750px" }}
          ref={svgRef}
        >
          <g>
            <line
              x1={0}
              y1={30}
              x2={1400}
              y2={30}
              stroke="black"
              strokeWidth={1}
            />
            {labels.map((label) => {
              const nucleotideWidth = viewWidth / (end - start);
              const pos = (label - start) * nucleotideWidth;
              return (
                <g key={`desc-${label}`}>
                  <line
                    x1={pos}
                    y1={20}
                    x2={pos}
                    y2={30}
                    stroke="black"
                    strokeWidth={1}
                  />
                  <text
                    key={label}
                    x={pos}
                    y={10}
                    fontSize={10}
                    fill="black"
                    textAnchor="middle"
                  >
                    {label} bp
                  </text>
                </g>
              );
            })}
          </g>
          <g id="text">{zoomIn()}</g>
          <g id="rect">{first()}</g>
          <g id="cds">
            <text x={30} y={105} fill="black" fontSize="12">
              CDS/sORF
            </text>
            {cds()}
          </g>
          <g id="tRNA">
            <text x={30} y={195} fill="black" fontSize="12">
              tNRA/tmRNA/rRNA
            </text>
            {tRNA()}
          </g>
          <g id="ncrna">
            <text x={30} y={285} fill="black" fontSize="12">
              ncRNA
            </text>
            {ncRNA()}
          </g>
          <g id="ncrna-region">
            <text x={30} y={375} fill="black" fontSize="12">
              ncRNA-region
            </text>
            {ncRNAregion()}
          </g>
          <g id="cirspr">
            <text x={30} y={465} fill="black" fontSize="12">
              CIRSPR
            </text>{" "}
            {CRISPR()}
          </g>
          <g id="gap">
            <text x={30} y={565} fill="black" fontSize="12">
              Gap
            </text>
            {Gap()}
          </g>
          <g id="oriC">
            <text x={30} y={645} fill="black" fontSize="12">
              oriC/oriV/oriT
            </text>
            {oriC()}
          </g>
        </svg>
      </Chart>
      {tooltips.map((tooltip) => (
        <Tooltip key={tooltip.id} x={tooltip.x} y={tooltip.y} visible={true}>
          <div
            onMouseDown={(e) => handleMouseDown(e, tooltip.id)}
            style={{
              backgroundColor: "gray",
              height: "20px",
              width: "100%",
              cursor: "grab",
            }}
          >
            <CloseButton onClick={() => handleClose(tooltip.id)}>X</CloseButton>
          </div>

          <div>
            <b>Type:</b> {tooltip.data.type}
          </div>
          <div>
            <b>Locus:</b> {tooltip.data.locus}
          </div>
          <div>
            <b>Gene:</b> {tooltip.data.gene}
          </div>
          <div>
            <b>Product:</b> {tooltip.data.product}
          </div>
          <div>
            <b>Name:</b> {tooltip.data.product}
          </div>
          <div>
            <b>Location:</b> {tooltip.data.location}: {tooltip.data.start}-
            {tooltip.data.stop} ({tooltip.data.strand})
          </div>
        </Tooltip>
      ))}
    </Container>
  );
};

export default Genome;
