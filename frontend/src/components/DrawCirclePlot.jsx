import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import d3 from "../script/d3";

const SvgContainer = styled.svg`
  width: 100%;
  background: #f0f0f0;
  cursor: ${(props) => (props.isPanning ? "grabbing" : "click")};
  user-select: none;
`;

const SkewChart = ({ w, h, windowLength }) => {
  const [input, setInput] = useState({
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
  });
  const svgRef = useRef(null);
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: w || 1400,
    height: h || 1400,
  });
  const [isPanning, setIsPanning] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const getMousePosition = (event) => {
      const rect = svg.getBoundingClientRect();
      return {
        x:
          ((event.clientX - rect.left) / rect.width) * viewBox.width +
          viewBox.x,
        y:
          ((event.clientY - rect.top) / rect.height) * viewBox.height +
          viewBox.y,
      };
    };

    const handleMouseMove = (event) => {
      if (!isPanning) return;
      const mousePos = getMousePosition(event);
      setViewBox((prev) => ({
        ...prev,
        x: prev.x - (mousePos.x - startPos.current.x),
        y: prev.y - (mousePos.y - startPos.current.y),
      }));
    };

    const handleMouseDown = (event) => {
      if (event.button !== 0) return; // Chỉ xử lý chuột trái
      setIsPanning(true);
      startPos.current = getMousePosition(event);
    };

    const handleMouseUp = () => setIsPanning(false);

    const handleWheel = (event) => {
      event.preventDefault();
      const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
      const mousePos = getMousePosition(event);
      setViewBox((prev) => ({
        x: mousePos.x - (mousePos.x - prev.x) * zoomFactor,
        y: mousePos.y - (mousePos.y - prev.y) * zoomFactor,
        width: prev.width * zoomFactor,
        height: prev.height * zoomFactor,
      }));
    };

    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mousedown", handleMouseDown);
    svg.addEventListener("mouseup", handleMouseUp);
    svg.addEventListener("mouseleave", handleMouseUp);
    svg.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mousedown", handleMouseDown);
      svg.removeEventListener("mouseup", handleMouseUp);
      svg.removeEventListener("mouseleave", handleMouseUp);
      svg.removeEventListener("wheel", handleWheel);
    };
  }, [isPanning, viewBox]);

  const width = w || 1400;
  const height = h || 1400;

  const centerX = width / 2;
  const centerY = height / 2;
  console.log(centerY);
  const radius = 300;
  const radius2 = 450;
  const radiusF1 = 450;
  const radiusF2 = 500;
  const features = input.features;
  const sequences = input.sequences;
  const windowSize = windowLength || 11;
  const extendRadius = 50;
  const sequence = sequences[0].nt;
  useEffect(() => {
    if (!sequence) return;

    const newData = [];
    const newData2 = [];
    const newLineHelper = [];

    for (let i = 0; i < sequence.length; i += 2) {
      const windowSeq = sequence.substring(i, i + windowSize);
      if (!windowSeq) continue;

      const gCount = [...windowSeq].filter((char) => char === "G").length;
      const cCount = [...windowSeq].filter((char) => char === "C").length;
      const gcSum = gCount + cCount;
      const gcSkew = gcSum === 0 ? 0 : (gCount - cCount) / gcSum;

      const angle = (i / sequence.length) * 2 * Math.PI - Math.PI / 2;
      const skewOffset = gcSkew * extendRadius;

      const x = centerX + (radius + skewOffset) * Math.cos(angle);
      const y = centerY + (radius + skewOffset) * Math.sin(angle);
      const x2 = centerX + (radius2 + skewOffset) * Math.cos(angle + 0.5);
      const y2 = centerY + (radius2 + skewOffset) * Math.sin(angle + 0.5);

      newData.push([x, y]);
      newData2.push([x2, y2]);
      newLineHelper.push({
        gcSkew,
        start: i + 1,
        end: i + windowSize,
        pos: {
          xh1: centerX + (radius - extendRadius) * Math.cos(angle),
          yh1: centerY + (radius - extendRadius) * Math.sin(angle),
          xh2: centerX + (radius + extendRadius) * Math.cos(angle),
          yh2: centerY + (radius + extendRadius) * Math.sin(angle),
        },
      });
    }

    setData(newData);
    setData2(newData2);
    setLineHelper(newLineHelper);
  }, [sequence]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [lineHelper, setLineHelper] = useState([]);
  const line = d3.line().curve(d3.curveLinear);
  const sortedFeatures = [...features].sort((a, b) => a.start - b.start);
  const layers = [];
  sortedFeatures.forEach((item) => {
    let placed = false;
    for (const layer of layers) {
      if (layer[layer.length - 1].stop <= item.start) {
        layer.push(item);
        placed = true;
        break;
      }
    }
    if (!placed) {
      layers.push([item]);
    }
  });
  function drawRingPart(outerRadius, innerRadius, startAngle, endAngle) {
    const x1 = centerX + outerRadius * Math.cos(startAngle);
    const y1 = centerY + outerRadius * Math.sin(startAngle);

    const x2 = centerX + outerRadius * Math.cos(endAngle);
    const y2 = centerY + outerRadius * Math.sin(endAngle);

    const x3 = centerX + innerRadius * Math.cos(endAngle);
    const y3 = centerY + innerRadius * Math.sin(endAngle);

    const x4 = centerX + innerRadius * Math.cos(startAngle);
    const y4 = centerY + innerRadius * Math.sin(startAngle);

    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

    return `
  M ${x1},${y1}
  A ${outerRadius},${outerRadius} 0 ${largeArcFlag} 1 ${x2},${y2}
  L ${x3},${y3}
  A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 0 ${x4},${y4}
  Z
  `;
  }
  return (
    <SvgContainer
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      isPanning={isPanning}
      id="gc-skew-chart"
      ref={svgRef}
    >
      <g>
        <g className="feature">
          {layers.map((layer, index) => {
            const rindex = layers.length - index;
            const currentOuterRadius = radiusF2 + rindex * 80;
            const currentInnerRadius = radiusF1 + rindex * 80;

            return (
              <g key={index}>
                {layer.map((item, i) => {
                  const startAngle = (item.start * 2 * Math.PI) / 3306;
                  const endAngle = (item.stop * 2 * Math.PI) / 3306;
                  const pathData = drawRingPart(
                    currentOuterRadius,
                    currentInnerRadius,
                    startAngle - Math.PI / 2,
                    endAngle - Math.PI / 2
                  );
                  const typeColors = {
                    cds: "#D6AADF",
                    tRNA: "#b2df8a",
                    tmRNA: "#b2df8a",
                    rRNA: "#fb8072",
                    ncRNA: "#fdb462",
                    "ncRNA-region": "#80b1d3",
                    CRISPR: "#bebada",
                    Gap: "#000000",
                    Misc: "#666666",
                    oriT: "#cccccc",
                  };

                  return (
                    <path key={i} d={pathData} fill={typeColors[item.type]} />
                  );
                })}
              </g>
            );
          })}
        </g>

        <g className="gc">
          <g className="gcContent">
            <circle cx={centerX} cy={centerY} r={radius2} fill="#BCBD22" />
            <path d={line(data2)} fill="#17BECF" />
            <defs>
              <clipPath id="inner-clip-2">
                <circle cx={centerX} cy={centerY} r={radius2} />
              </clipPath>
            </defs>
            <path d={line(data2)} fill="white" clipPath="url(#inner-clip-2)" />
          </g>

          <g className="gcSkew">
            <circle cx={centerX} cy={centerY} r={radius} fill="#CAB2D6" />
            <path d={line(data)} fill="#FB9A99" />
            <defs>
              <clipPath id="inner-clip-1">
                <circle cx={centerX} cy={centerY} r={radius} />
              </clipPath>
            </defs>
            <path d={line(data)} fill="white" clipPath="url(#inner-clip-1)" />
          </g>

          {[radius - 50, radius - 25, radius, radius + 25, radius + 50].map(
            (r, i) => (
              <circle
                key={i}
                cx={centerX}
                cy={centerY}
                r={r}
                fill="none"
                stroke={r === radius ? "black" : "#DDDDDD"}
              />
            )
          )}

          {[
            radius2 - 50,
            radius2 - 25,
            radius2,
            radius2 + 25,
            radius2 + 50,
          ].map((r, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={r}
              fill="none"
              stroke={r === radius2 ? "black" : "#DDDDDD"}
            />
          ))}
        </g>
      </g>
      {/* <circle cx={centerX} cy={centerY} r={500} fill="blue" /> */}
    </SvgContainer>
  );
};

export default SkewChart;
