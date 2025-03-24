import React, { useState, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import d3 from "../script/d3";

const SvgContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  user-select: none;
`;

const StyledSvg = styled.svg`
  &:active {
    cursor: grabbing;
  }
  width: 100%;
`;
const PathHover = styled.path`
  &:hover {
    stroke: black;
    stroke-width: 1;
  }
`;
const DraggableZoomableSVG = ({ dataFetch, w, h, windowLength }) => {
  const input = {
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
  };
  const [curr, setCurr] = useState();
  const lineref1 = useRef();
  const lineref2 = useRef();
  const main = useRef();
  const width = w || 1400;
  const height = h || 1400;
  const svgRef = useRef(null);
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
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [id, setId] = useState(null);
  const data = useMemo(() => {
    if (!sequence) return;

    const newData = [];
    const newData2 = [];
    const gcSkew = [];
    const gcContent = [];
    let gTotal = 0;
    let cTotal = 0;
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] == "G") {
        gTotal++;
      } else if (sequence[i] == "C") {
        cTotal++;
      }
    }
    const gcContentMeanValue = (gTotal + cTotal) / sequence.length;
    for (let i = 0; i < sequence.length; i += 2) {
      const windowSeq = sequence.substring(i, i + windowSize);
      if (!windowSeq) continue;

      const gCount = [...windowSeq].filter((char) => char === "G").length;
      const cCount = [...windowSeq].filter((char) => char === "C").length;
      const gcSum = gCount + cCount;
      const gcSkewValue = gcSum === 0 ? 0 : (gCount - cCount) / gcSum;
      const gcContentValue = gcSum / windowSize - gcContentMeanValue;
      let angle = (i / sequence.length) * 2 * Math.PI;
      if (angle >= Math.PI) {
        angle = angle - 2 * Math.PI;
      }
      const skewOffset = gcSkewValue * extendRadius;
      const contentOffset = gcContentValue * extendRadius * 2;
      const x = centerX + (radius + skewOffset) * Math.cos(angle);
      const y = centerY + (radius + skewOffset) * Math.sin(angle);
      const x2 = centerX + (radius2 + contentOffset) * Math.cos(angle);
      const y2 = centerY + (radius2 + contentOffset) * Math.sin(angle);

      newData.push([x, y]);
      newData2.push([x2, y2]);

      gcSkew[i] = {
        gcSkewValue,
        start: i + 1,
        end: i + windowSize,
      };

      gcContent[i] = {
        gcContentValue,
        start: i + 1,
        end: i + windowSize,
      };
    }

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

    return {
      newData,
      newData2,
      gcSkew,
      sortedFeatures,
      layers,
      gcContent,
      gcSkewMean:
        gTotal - cTotal == 0
          ? 0
          : ((gTotal - cTotal) / sequence.length).toFixed(3),
      gcContentMean: gcContentMeanValue.toFixed(3),
    };
  }, [sequence]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - start.x, y: e.clientY - start.y });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: w || 1400,
    height: h || 1400,
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
  const [hoveredShape, setHoveredShape] = useState(null);
  const handleHovering = (isHovering, id) => {
    setHoveredShape(isHovering ? id : null);
  };

  const handleMouseMoveHover = (e, bool, r, id) => {
    if (!bool) {
      setIsHovering(false);
      setId(null);
      setCurr(null);
      return;
    }

    setIsHovering(true);
    setId(id);

    const mousePos = getMousePosition(e);
    let angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
    const x1 = centerX + (r - extendRadius) * Math.cos(angle);
    const y1 = centerY + (r - extendRadius) * Math.sin(angle);
    const x2 = centerX + (r + extendRadius) * Math.cos(angle);
    const y2 = centerY + (r + extendRadius) * Math.sin(angle);
    const newCurr = `M ${x1}, ${y1} L ${x2}, ${y2} Z`;
    setCurr(newCurr);

    if (angle < 0) angle += 2 * Math.PI;
    const index = Math.round((angle / (2 * Math.PI)) * sequence.length);

    if (tool) {
      tool.style.display = "flex";
      tool.style.flexDirection = "column";
      tool.style.left = `${e.clientX}px`;
      tool.style.top = `${e.clientY + 50}px`;

      const gcSkew = data.gcSkew[index % sequence.length];
      const gcContent = data.gcContent[index % sequence.length];

      if (gcSkew && gcContent) {
        if (id === 1) {
          lineref1.current.style.opacity = 1;
          lineref2.current.style.opacity = 0;
          tool.innerHTML = `
            <div>GC Skew</div>
            <div>Value: ${gcSkew.gcSkewValue.toFixed(3)}</div>
            <div>Mean: ${data.gcSkewMean}</div>
            <div>Window [${gcSkew.start}, ${gcSkew.end}]</div>
          `;
        } else if (id === 2) {
          lineref2.current.style.opacity = 1;
          lineref1.current.style.opacity = 0;
          tool.innerHTML = `
            <div>GC Content</div>
            <div>Value: ${gcContent.gcContentValue.toFixed(3)}</div>
            <div>Mean: ${data.gcContentMean}</div>
            <div>Window [${gcContent.start}, ${gcContent.end}]</div>
          `;
        }
      }
    }
  };

  const getMousePosition = (event) => {
    const svg = svgRef.current;
    if (!svg) return null;

    const point = new DOMPoint(event.clientX, event.clientY);
    const screenCTM = svg.getScreenCTM();
    if (!screenCTM) return null;

    const transformMatrix = screenCTM.inverse();
    const svgPoint = point.matrixTransform(transformMatrix);

    return { x: svgPoint.x, y: svgPoint.y };
  };

  const setHoverFalse = () => {
    setIsHovering(false);
    if (tool) {
      tool.style.display = "none";
    }
  };
  const line = d3.line().curve(d3.curveLinear);
  useEffect(() => {
    const handleWheelEvent = (e) => {
      e.preventDefault();
      setScale((prev) => prev * Math.exp(-e.deltaY * 0.001));
    };

    main.current.addEventListener("wheel", handleWheelEvent, {
      passive: false,
    });
  }, [svgRef.current]);

  return (
    <SvgContainer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={main}
    >
      <StyledSvg
        ref={svgRef}
        width={1400}
        height={1400}
        viewBox="-100 0 1500 1500"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(-90deg)`,
          transformOrigin: `${centerX}px ${centerY}px`,
        }}
      >
        <CircularText
          x={centerX}
          y={centerY}
          r={radiusF2 + data.layers.length * 80 + 25}
          s={3306}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radiusF2 + data.layers.length * 80 + 10}
          fill="transparent"
          stroke="black"
          strokeWidth={2}
        />
        <g>
          <g className="feature">
            {data.layers.map((layer, index) => {
              const rindex = data.layers.length - index;
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
                      <PathHover
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
              <path d={line(data.newData2)} fill="#17BECF" />
              <defs>
                <clipPath id="inner-clip-2">
                  <circle cx={centerX} cy={centerY} r={radius2} />
                </clipPath>
              </defs>
              <path
                d={line(data.newData2)}
                fill="white"
                clipPath="url(#inner-clip-2)"
              />
            </g>

            <g className="gcSkew">
              <circle cx={centerX} cy={centerY} r={radius} fill="#CAB2D6" />
              <path d={line(data.newData)} fill="#FB9A99" />
              <defs>
                <clipPath id="inner-clip-1">
                  <circle cx={centerX} cy={centerY} r={radius} />
                </clipPath>
              </defs>
              <path
                d={line(data.newData)}
                fill="white"
                clipPath="url(#inner-clip-1)"
              />
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
            <g
              className="hover"
              onMouseMove={(e) => handleMouseMoveHover(e, true, radiusF1, 2)}
              onMouseLeave={() => setHoverFalse(false, 2)}
            >
              <path
                d="M 700 200 
                A 500 500 0 1 1 700 1200 
                A 500 500 0 1 1 700 200 
                M 700 300 
                A 400 400 0 1 0 700 1100 
                A 400 400 0 1 0 700 300 Z"
                fill="transparent"
                fillRule="evenodd"
              />
              <path
                id="myLine"
                stroke="lightgray"
                strokeWidth="2"
                strokeDasharray="3,7"
                d={curr}
                ref={lineref1}
                opacity={id == 2 ? 1 : 0}
                style={{
                  pointerEvents: isHovering ? "none" : "auto",
                  opacity: isHovering ? "1" : "0",
                }}
              />
            </g>
            <g
              className="hover"
              onMouseMove={(e) => handleMouseMoveHover(e, true, radius, 1)}
              onMouseLeave={() => setHoverFalse(false, 1)}
            >
              <path
                d="M 700 350 
      A 350 350 0 1 1 700 1050 
      A 350 350 0 1 1 700 350 
      M 700 450 
      A 250 250 0 1 0 700 950 
      A 250 250 0 1 0 700 450 Z"
                fill="transparent"
                fillRule="evenodd"
              />
              <path
                id="myLine"
                stroke="lightgray"
                strokeWidth="2"
                strokeDasharray="3,7"
                d={curr}
                ref={lineref2}
                opacity={id == 1 ? 1 : 0}
                style={{
                  pointerEvents: isHovering ? "none" : "auto",
                  opacity: isHovering ? "1" : "0",
                }}
              />
            </g>
          </g>
        </g>
        <path
          d="M 950,690 L950, 701 M950, 700 L 1050,700 M 1050,701 L 1050,690"
          stroke="black"
          strokeWidth="2"
        />
        <text
          x="1020"
          y="690"
          fontSize="16"
          fill="black"
          transform="rotate(90, 1050, 700)"
        >
          GC skew
        </text>
        <text
          x="945"
          y="675"
          fontSize="16"
          fill="black"
          transform="rotate(90, 945, 675)"
        >
          -1
        </text>
        <text
          x="1045"
          y="675"
          fontSize="16"
          fill="black"
          transform="rotate(90, 1045, 675)"
        >
          1
        </text>
        <path
          d="M 1100,690 L1100, 701 M1100, 700 L 1200,700 M 1200,701 L 1200,690"
          stroke="black"
          strokeWidth="2"
        />
        <text
          x="1170"
          y="680"
          fontSize="16"
          fill="black"
          transform="rotate(90, 1200, 700)"
        >
          GC Content
        </text>
        <text
          x="1095"
          y="660"
          fontSize="16"
          fill="black"
          transform="rotate(90, 1095, 660)"
        >
          -0.6
        </text>
        <text
          x="1195"
          y="660"
          fontSize="16"
          fill="black"
          transform="rotate(90, 1195, 660)"
        >
          0.6
        </text>
      </StyledSvg>
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
    </SvgContainer>
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
  const mores = [];
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

export default DraggableZoomableSVG;
