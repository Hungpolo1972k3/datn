import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import d3 from "../script/d3";

const SvgContainer = styled.svg`
  width: 100%;
  height: 100%;
  background: #ffffff;
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
  const mainRef = useRef(null);

  const lineRef = useRef(null);
  const outerRef = useRef(null);
  const interRef = useRef(null);
  const [curr, setCurr] = useState();
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: w || 1400,
    height: h || 1400,
  });
  // const [isPanning, setIsPanning] = useState(false);
  // const [isHovering, setIsHovering] = useState(false);
  // const startPos = useRef({ x: 0, y: 0 });

  const width = w || 1400;
  const height = h || 1400;

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 300;
  const radius2 = 450;
  const radiusF1 = 450;
  const radiusF2 = 500;
  const features = input.features;
  const sequences = input.sequences;
  const windowSize = windowLength || 11;
  const extendRadius = 50;
  const sequence = sequences[0].nt;
  const animationFrameRef = useRef(null); // Khai báo animationFrameRef
  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      // Hủy bỏ các cuộc gọi trước đó
      clearTimeout(timeoutId);

      // Thiết lập một cuộc gọi mới sau delay
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  const [isHovering, setIsHovering] = useState(false);
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
      const gcSkewValue = gcSum === 0 ? 0 : (gCount - cCount) / gcSum;

      let angle = (i / sequence.length) * 2 * Math.PI;
      if (angle >= Math.PI) {
        angle = angle - 2 * Math.PI;
      }
      const skewOffset = gcSkewValue * extendRadius;

      const x = centerX + (radius + skewOffset) * Math.cos(angle);
      const y = centerY + (radius + skewOffset) * Math.sin(angle);
      const x2 = centerX + (radius2 + skewOffset) * Math.cos(angle + 0.5);
      const y2 = centerY + (radius2 + skewOffset) * Math.sin(angle + 0.5);

      newData.push([x, y]);
      newData2.push([x2, y2]);
      gcSkew[angle >= 0 ? i + 1 : -(sequence.length - i - 1)] = {
        gcSkewValue,
        start: i + 1,
        end: i + windowSize,
      };
    }
    console.log(gcSkew);
    setData(newData);
    setData2(newData2);
    setLineHelper(newLineHelper);
  }, [sequence]);
  const gcSkew = {};
  const gcContent = [];
  const radPerNu = (2 * Math.PI) / sequence.length;
  const [scale, setScale] = useState(1);

  const [isPanning, setIsPanning] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const line = lineRef.current;
    const outer = outerRef.current;
    const inter = interRef.current;
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
      if (event.button !== 0) return;
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
    const handleMouseEnter = (event, radius) => {
      const r = radius;
      const mousePos = getMousePosition(event);
      const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
      const x1 = centerX + (r - extendRadius) * Math.cos(angle);
      const y1 = centerY + (r - extendRadius) * Math.sin(angle);
      const x2 = centerX + (r + extendRadius) * Math.cos(angle);
      const y2 = centerY + (r + extendRadius) * Math.sin(angle);
      const curr = `M ${x1}, ${y1} L ${x2}, ${y2} Z`;
      setCurr(curr);
      setIsHovering(true);
      console.log(angle);
      // if (tool) {
      //   tool.style.display = "flex";
      //   tool.style.flexDirection = "column";
      //   tool.style.left = event.clientX + "px";
      //   tool.style.top = event.clientY + 50 + "px";
      //   const value = gcSkew[Math.ceil(angle / radPerNu) + 1];
      //   if (value) {
      //     console.log(Math.ceil(angle / radPerNu) + 1);

      //     tool.innerHTML = `<div>GC Skew</div><div>Value : ${value.gcSkewValue.toFixed(
      //       2
      //     )}</div><div>Mean : ? </div><div>Windown [${value.start}, ${
      //       value.end
      //     }]</div>`;
      //   }
      // }
    };
    const handleMouseLeave = (event) => {
      if (isHovering) return;
      setCurr(null);
    };
    const handleOuterMouseEnter = (event) => {
      handleMouseEnter(event, radiusF1);
    };

    const handleInterMouseEnter = (event) => {
      handleMouseEnter(event, radius);
    };
    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mousedown", handleMouseDown);
    svg.addEventListener("mouseup", handleMouseUp);
    svg.addEventListener("mouseleave", handleMouseUp);
    svg.addEventListener("wheel", handleWheel, { passive: false });
    outer.addEventListener("mousemove", handleOuterMouseEnter);
    outer.addEventListener("mouseleave", handleMouseLeave);
    inter.addEventListener("mousemove", handleInterMouseEnter);
    inter.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mousedown", handleMouseDown);
      svg.removeEventListener("mouseup", handleMouseUp);
      svg.removeEventListener("mouseleave", handleMouseUp);
      svg.removeEventListener("wheel", handleWheel);
    };
  }, [isPanning, viewBox]);
  // useEffect(() => {
  //   let isPanning = false; //
  //   let offsetX, offsetY;

  //   const svg = svgRef.current;
  //   if (!svg) return;
  //   const line = lineRef.current;
  //   const outer = outerRef.current;
  //   const inter = interRef.current;
  //   const circleGroup = mainRef.current;
  //   // const line = document.getElementById("myLine");
  //   svg.addEventListener("mousedown", (e) => {
  //     // console.log(e.target);
  //     const curPos = getMousePosition(e);
  //     isPanning = true;
  //     offsetX = e.clientX - svg.getBoundingClientRect().left;
  //     offsetY = e.clientY - svg.getBoundingClientRect().top;
  //     svg.style.cursor = "grabbing"; // Change the cursor to grabbing
  //     console.log("Dragging started");
  //     console.log(curPos.x, curPos.y);
  //   });

  //   svg.addEventListener("mouseup", () => {
  //     isPanning = false;
  //     svg.style.cursor = "default";
  //     console.log("Dragging ended");
  //   });

  //   svg.addEventListener("mouseleave", () => {
  //     isPanning = false;
  //     svg.style.cursor = "default";
  //   });
  //   const getMousePosition = (event) => {
  //     const rect = svg.getBoundingClientRect();
  //     return {
  //       x:
  //         ((event.clientX - rect.left) / rect.width) * viewBox.width +
  //         viewBox.x,
  //       y:
  //         ((event.clientY - rect.top) / rect.height) * viewBox.height +
  //         viewBox.y,
  //     };
  //   };
  //   svg.addEventListener("mousemove", (event) => {
  //     if (isPanning) {
  //       const mousePos = getMousePosition(event);
  //       console.log("first");
  //       circleGroup.setAttribute(
  //         "transform",
  //         `translate(${mousePos.x}, ${mousePos.y})`
  //       );
  //     } else return;
  //   });

  //   const handleWheel = (event) => {
  //     event.preventDefault();
  //     const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
  //     const mousePos = getMousePosition(event);

  //     setScale(scale * zoomFactor);
  //     // setViewBox((prev) => ({
  //     //   x: (mousePos.x - startPos.current.x),
  //     //   y: (mousePos.y - startPos.current.y),
  //     // }));
  //   };
  //   // const handleMouseEnter = (event, radius) => {
  //   //   const r = radius;
  //   //   const mousePos = getMousePosition(event);
  //   //   const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
  //   //   const x1 = centerX + (r - extendRadius) * Math.cos(angle);
  //   //   const y1 = centerY + (r - extendRadius) * Math.sin(angle);
  //   //   const x2 = centerX + (r + extendRadius) * Math.cos(angle);
  //   //   const y2 = centerY + (r + extendRadius) * Math.sin(angle);
  //   //   const curr = `M ${x1}, ${y1} L ${x2}, ${y2} Z`;
  //   //   setCurr(curr);
  //   //   setIsHovering(true);
  //   //   // console.log(angle / radPerNu);
  //   //   if (tool) {
  //   //     tool.style.display = "flex";
  //   //     tool.style.flexDirection = "column";
  //   //     tool.style.left = event.clientX + "px";
  //   //     tool.style.top = event.clientY + 50 + "px";
  //   //     const value = gcSkew[Math.round(angle / radPerNu)];
  //   //     if (value) {
  //   //       tool.innerHTML = `<div>GC Skew</div><div>Value : ${value.gcSkewValue.toFixed(
  //   //         2
  //   //       )}</div><div>Mean : ? </div><div>Windown [${value.start}, ${
  //   //         value.end
  //   //       }]</div>`;
  //   //     }
  //   //   }
  //   // };

  //   // const handleMouseLeave = (event) => {
  //   //   if (isHovering) return;
  //   //   setCurr(null);
  //   // };
  //   // const handleOuterMouseEnter = (event) => {
  //   //   handleMouseEnter(event, radiusF1);
  //   // };

  //   // const handleInterMouseEnter = (event) => {
  //   //   handleMouseEnter(event, radius);
  //   // };

  //   // svg.addEventListener("mousemove", handleMouseMove);
  //   // svg.addEventListener("mousedown", handleMouseDown);
  //   // svg.addEventListener("mouseup", handleMouseUp);
  //   // svg.addEventListener("mouseleave", handleMouseUp);
  //   svg.addEventListener("wheel", handleWheel, { passive: false });
  //   // outer.addEventListener("mousemove", handleOuterMouseEnter);
  //   // outer.addEventListener("mouseleave", handleMouseLeave);
  //   // inter.addEventListener("mousemove", handleInterMouseEnter);
  //   // inter.addEventListener("mouseleave", handleMouseLeave);

  //   // return () => {
  //   //   svg.removeEventListener("mousemove", handleMouseMove);
  //   //   svg.removeEventListener("mousedown", handleMouseDown);
  //   //   svg.removeEventListener("mouseup", handleMouseUp);
  //   //   svg.removeEventListener("mouseleave", handleMouseUp);
  //   //   svg.removeEventListener("wheel", handleWheel);
  //   //   // outer.removeEventListener("mousemove", handleOuterMouseEnter);
  //   //   // outer.removeEventListener("mouseleave", handleMouseLeave);

  //   //   // inter.removeEventListener("mousemove", handleInterMouseEnter);
  //   //   // inter.removeEventListener("mouseleave", handleMouseLeave);
  //   // };
  // }, [isPanning, viewBox, scale]);
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
    <div>
      <style>
        {`
                    .hover {
                    }
                    .hover:hover {
                        stroke: black;
                        stroke-width: 1;
                    }
                `}
      </style>
      <SvgContainer
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width * scale} ${
          viewBox.height * scale
        }`}
        isPanning={isPanning}
        id="gc-skew-chart"
        ref={svgRef}
        scale={scale}
      >
        <CircularText
          x={centerX}
          y={centerY}
          r={radiusF2 + layers.length * 80 + 25}
          s={3306}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radiusF2 + layers.length * 80 + 10}
          fill="transparent"
          stroke="black"
          strokeWidth={2}
        />
        <g ref={mainRef} scale={scale}>
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
                      startAngle,
                      endAngle
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
                    const fillColor = typeColors[item.type];

                    return (
                      <path
                        className="hover"
                        key={i}
                        d={pathData}
                        fill={fillColor}
                        onMouseMoveCapture={(e) => {
                          if (tool) {
                            tool.style.display = "flex";
                            tool.style.flexDirection = "column";
                            tool.style.left = e.clientX + 20 + "px";
                            tool.style.top = e.clientY + "px";
                            if (e.clientY > 600) {
                              tool.style.top = e.clientY - 200 + "px";
                            }
                            tool.innerHTML = `<div>Type: ${item.type}</div>${
                              item.strand
                                ? `<div>Strand ${item.strand}</div>`
                                : ``
                            }${
                              item.frame ? `<div>Frame ${item.frame}</div>` : ``
                            }<div>Coordinates ${item.stop - item.start}</div>${
                              item.locus
                                ? `<div>Locus ${item.locus}</div>`
                                : `<div>Locus -</div>`
                            }${
                              item.gene
                                ? `<div>Gene ${item.gene}</div>`
                                : `<div>Gene -</div>`
                            }<div>Product ${item.product}</div><div>GC ${
                              item.gc
                            }</div>`;
                          }
                        }}
                        onMouseLeave={() => {
                          if (tool) {
                            tool.style.display = "none";
                          }
                        }}
                      />
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
              <path
                d={line(data2)}
                fill="white"
                clipPath="url(#inner-clip-2)"
              />
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
                  fill="transparent"
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
          <g>
            <g>
              <circle
                cx={centerX}
                cy={centerY}
                r={radiusF1 + 60}
                fill="transparent"
                stroke="none"
                onMouseEnter={() => {
                  setCurr(null);
                  if (tool) {
                    tool.style.display = "none";
                  }
                }}
              />
              <defs>
                <clipPath id="hole2">
                  <circle cx={centerX} cy={centerY} r={radiusF1 - 50} />
                </clipPath>
              </defs>
              <circle
                cx={centerX}
                cy={centerY}
                ref={outerRef}
                r={radiusF1 + 50}
                fill="transparent"
                stroke="none"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r={radiusF1 - 50}
                fill="transparent"
                stroke="none"
                onMouseEnter={() => {
                  setCurr(null);
                  if (tool) {
                    tool.style.display = "none";
                  }
                }}
              />
            </g>
            <g>
              <defs>
                <clipPath id="hole1">
                  <circle cx={centerX} cy={centerY} r={radius - 50} />
                </clipPath>
              </defs>
              <circle
                cx={centerX}
                cy={centerY}
                ref={interRef}
                r={radius + 50}
                fill="transparent"
                stroke="none"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r={radius - 50}
                onMouseEnter={() => {
                  setCurr(null);
                  if (tool) {
                    tool.style.display = "none";
                  }
                }}
                fill="transparent"
                stroke="none"
                clipPath="url(#hole1)"
              />
            </g>
          </g>
        </g>

        <path
          id="myLine"
          stroke="red"
          strokeWidth="1"
          strokeDasharray="1,10"
          ref={lineRef}
          d={curr}
          onMouseEnter={() => setIsHovering(true)}
        />
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + radiusF2}
          y2={centerY}
          stroke="green"
          strokeWidth={1}
        />
      </SvgContainer>
      <div
        id="tool"
        style={{
          position: "fixed",
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid black",
          borderRadius: "4px",
          display: "none",
          gap: "5px",
        }}
      ></div>
    </div>
  );
};

const CircularText = ({ x, y, r, r2, r3, s }) => {
  const pi = Math.PI;
  const centerX = x || 700;
  const centerY = y || 700;
  const radius = r || 670;
  const radiusout = r2 || 680;
  const radiusin = r3 || 670;
  const paths = [];
  const helpers = [];
  const texts = [];
  const segementLength = Math.ceil(s / 18 / 100) * 100;
  const rad = (2 * pi) / s;
  const segement = Math.floor(s / segementLength);
  const lastSegement = s - segement * segementLength;
  const startLastSegement = s - lastSegement;
  const startLastSegmentRad = (startLastSegement * 2 * pi) / s;
  for (let angle = 0; angle <= segement; angle++) {
    const startAngle = angle * rad * segementLength - 0.01;
    const endAngle = startAngle + rad * segementLength;
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    const xo1 = centerX + radiusout * Math.cos(startAngle + 0.01);
    const yo1 = centerY + radiusout * Math.sin(startAngle + 0.01);
    const xo2 = centerX + radiusin * Math.cos(startAngle + 0.01);
    const yo2 = centerY + radiusin * Math.sin(startAngle + 0.01);
    const pathId = `path-${angle}`;
    // Tạo đường cong
    const helper = `M ${xo2},${yo2}  L ${xo1}, ${yo1}`;
    const d = `M ${x1},${y1} A ${radius},${radius} 0 0,1 ${x2},${y2}`;
    paths.push(<path key={pathId} id={pathId} d={d} fill="none" />);
    helpers.push(
      <path d={helper} fill="none" stroke="black" strokeWidth={2} />
    );
    texts.push(
      <text key={`text-${angle}`} fontSize="16" fill="black">
        <textPath href={`#${pathId}`}>
          {(segementLength * angle) / 1000} kbp
        </textPath>
      </text>
    );
  }

  return (
    <g>
      {paths}
      {texts}
      {helpers}
    </g>
  );
};
const CircleRingsPath = ({ centerX, centerY, radius, radius2 }) => {
  // Hàm tạo path cho các vành tròn
  const createCirclePath = (baseRadius) => {
    return [
      baseRadius - 50,
      baseRadius - 25,
      baseRadius,
      baseRadius + 25,
      baseRadius + 50,
    ].map((r, i) => {
      const startAngle = 0;
      const endAngle = Math.PI * 2; // Vẽ vòng tròn hoàn chỉnh
      return (
        <path
          key={i}
          d={`M ${centerX + r} ${centerY} 
             A ${r} ${r} 0 1 1 ${centerX - r} ${centerY} 
             A ${r} ${r} 0 1 1 ${centerX + r} ${centerY}`}
          fill="transparent"
          stroke={r === baseRadius ? "black" : "#DDDDDD"}
        />
      );
    });
  };

  return (
    <>
      {/* Vẽ vành tròn cho radius */}
      {createCirclePath(radius)}

      {/* Vẽ vành tròn cho radius2 */}
      {createCirclePath(radius2)}
    </>
  );
};

export default SkewChart;
