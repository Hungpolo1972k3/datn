import React, { useEffect, useState } from "react";
// import CircleWithLinesAndText from "../a";
const CirclePlot = () => {
  const width = 1300;
  const height = 1400;
  const radiusF1 = 300;
  const radiusF2 = 350;
  const [gcSkew, setGcSkew] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [tool, setTool] = useState();
  const [tool2, setTool2] = useState();
  const [helper, setHelper] = useState();
  const [linepath, setLinePath] = useState();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMousePos = (e) => {
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      const startX = centerX + (dx / distance) * 150;
      const startY = centerY + (dy / distance) * 150;
      const endX = centerX + (dx / distance) * 250;
      const endY = centerY + (dy / distance) * 250;
      setLinePath({ startX, startY, endX, endY });
    }
  };

  useEffect(() => {
    setTool(document.getElementById("tool"));
    setTool2(document.getElementById("tool2"));

    setHelper(document.getElementById("line"));
    window.addEventListener("mousemove", handleMousePos);
    const svg = document.getElementById("gc-skew-chart");
    svg.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
    return () => window.removeEventListener("mousemove", handleMousePos);
  }, []);
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
  const genome = dataFetched[0].genome;
  const stats = dataFetched[0].stats;
  const features = dataFetched[0].features;
  const sequences = dataFetched[0].sequences;
  const run = dataFetched[0].run;
  const windowSize = 10;
  const radius = 150;
  const data = [];
  const radius2 = 300;
  const data2 = [];
  const centerX = 650;
  const centerY = 700;
  const sequence = sequences[0].nt;
  const gcData = [];
  for (let i = 0; i < sequence.length; i += windowSize) {
    const windowSeq = sequence.substring(i + 1, i + windowSize);
    const gCount = (windowSeq.match(/G/g) || []).length;
    const cCount = (windowSeq.match(/C/g) || []).length;
    const gcSum = gCount + cCount;
    const gcSkew = gcSum === 0 ? 0 : (gCount - cCount) / gcSum;
    const angle = (i / sequence.length) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + (radius + gcSkew * 50) * Math.cos(angle);
    const y = centerY + (radius + gcSkew * 50) * Math.sin(angle);
    const x2 = centerX + (radius2 + gcSkew * 50) * Math.cos(angle + 0.5);
    const y2 = centerY + (radius2 + gcSkew * 50) * Math.sin(angle + 0.5);
    data.push([x, y]);
    data2.push([x2, y2]);
  }
  const line = d3.line().curve(d3.curveLinear);
  function generatePairs() {
    const result = [];
    for (let i = 1; i <= 2995; i += 2) {
      if (i + 10 >= 3305) break;
      result.push([i, i + 10]);
    }

    result.push([3297, 3307]);
    result.push([3299, 3209]);
    result.push([-3, 7]);
    result.push([-1, 9]);

    return result;
  }
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: centerX, y: centerY });
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;

    const dx = (e.clientX - startPos.x) * scale;
    const dy = (e.clientY - startPos.y) * scale;

    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    setStartPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => setDragging(false);

  const handleWheel = (e) => {
    let zoomIntensity;
    if (scale < 0.1) {
      zoomIntensity = 0.008;
    } else {
      zoomIntensity = 0.08;
    }
    const direction = e.deltaY > 0 ? -1 : 1;
    console.log(scale);
    setScale((prevScale) =>
      Math.min(Math.max(prevScale + direction * zoomIntensity, 0.01), 10)
    );
  };
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
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
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
      <svg
        id="gc-skew-chart"
        style={{ width: "100%", height: "100%" }}
        viewBox={`0 0 ${width * scale} ${height * scale}`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        transform=""
      >
        <g
          transform={`translate(${position.x},${position.y}) `}
          onMouseDown={handleMouseDown}
        >
          <g className="desc">
            <CircleWithLinesAndText
              radius={radiusF2 + layers.length * 80 + 50}
              parts={3306}
              lineSpacing={200}
              width={width}
              height={height}
            />
          </g>
          <g className="feature">
            {layers.map((layer, index) => {
              const rindex = layers.length - index;
              const currentOuterRadius = radiusF2 + rindex * 80;
              const currentInnerRadius = radiusF1 + rindex * 80;
              let color = "red";
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
                            console.log(e.client);
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

            <g>
              <circle
                cx={centerX}
                cy={centerY}
                r={radius - 50}
                fill="none"
                stroke="#DDDDDD"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r={radius - 25}
                fill="none"
                stroke="#DDDDDD"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="black"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r={radius + 25}
                fill="none"
                stroke="#DDDDDD"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r={radius + 50}
                fill="none"
                stroke="#DDDDDD"
              />
              <g>
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius2 - 50}
                  fill="none"
                  stroke="#DDDDDD"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius2 - 25}
                  fill="none"
                  stroke="#DDDDDD"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius2}
                  fill="none"
                  stroke="black"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius2 + 25}
                  fill="none"
                  stroke="#DDDDDD"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius2 + 50}
                  fill="none"
                  stroke="#DDDDDD"
                />
              </g>
            </g>
          </g>
        </g>
        <CircleWithLinesAndText
          centerX={centerX}
          centerY={centerY}
          radius2={600}
        />
      </svg>
      <div
        id="tool"
        style={{
          minWidth: "100px",
          position: "absolute",
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid black",
          borderRadius: "4px",
          display: "none",
          gap: "5px",
        }}
      />
    </div>
  );
};

const CircleWithLinesAndText = ({
  radius,
  parts,
  lineSpacing,
  width,
  height,
}) => {
  const angleBetweenParts = 360 / parts;
  const angleBetweenLines = lineSpacing * angleBetweenParts;

  const centerX = width / 2;
  const centerY = height / 2;

  const lines = [];
  const text = [];
  const l = 20;
  for (let i = 0; i < parts / lineSpacing; i++) {
    const angle = i * angleBetweenLines;

    const angleInRadians = (angle * Math.PI) / 180 - Math.PI / 2;

    const x2 = centerX + (radius + l) * Math.cos(angleInRadians);
    const y2 = centerY + (radius + l) * Math.sin(angleInRadians);
    const x1 = centerX + radius * Math.cos(angleInRadians);
    const y1 = centerY + radius * Math.sin(angleInRadians);

    const textX = centerX + (radius + l + 40) * Math.cos(angleInRadians);
    const textY = centerY + 10 + (radius + l + 40) * Math.sin(angleInRadians);

    const textValue = (i * lineSpacing) / 1000;
    lines.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth={3}
      />
    );
    text.push(
      <text
        key={i}
        x={textX + 5}
        y={textY}
        fontSize="14"
        fill="black"
        textAnchor="middle"
        style={{ userSelect: "none" }}
      >
        {textValue} kbp
      </text>
    );
  }

  return (
    <g>
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        stroke="black"
        strokeWidth="2"
        fill="white"
      />
      {lines}
      {text}
    </g>
  );
};

export default CirclePlot;
