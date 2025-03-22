import React, { useState, useEffect } from "react";
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
const DNAViewer = ({ w, h }) => {
  const sequence =
    "GCAGTATGTTGTGATACTTCCTTACCATAATTTTTTCATAGCTTTGATACTGTTTTTCACTGCATTTGCTGAT".repeat(
      50
    );
  const colors = { A: "green", T: "red", G: "orange", C: "blue" };
  const totalNu = sequence.length;
  const viewWidth = 1000;
  const rectHeight = 30;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3000);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const newElements = Array.from(sequence).map((nucleotide, i) => ({
      nucleotide,
      color: colors[nucleotide] || "black",
    }));
    setElements(newElements);
  }, [sequence]);

  const updateView = () => {
    const zoomLevel = totalNu / (end - start);
    document.getElementById("zoom").value = Math.round(zoomLevel);
  };
  useEffect(() => {
    const rect = document.getElementById("rect");
    if (end - start < 100) {
      rect.style.display = "none";
    } else {
      rect.style.display = "block";
    }
    console.log("end");
  }, [end]);
  useEffect(() => {
    updateView();
  }, []);

  const handleZoomChange = (event) => {
    const zoom = parseInt(event.target.value, 10);
    const length = Math.floor(totalNu / zoom);
    const newEnd = Math.min(start + length, totalNu);
    setEnd(newEnd);
    console.log("hande");
  };

  const first = () => {
    return elements.slice(start, end).map((element, index) => {
      const nucleotideWidth = viewWidth / (end - start);
      const x = index * nucleotideWidth;
      return (
        <g key={index}>
          <rect
            x={x}
            y={5}
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
          {console.log("zoo")}
          <text
            x={x + nucleotideWidth / 2}
            y={25}
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
  const layers = [];
  const sortedFeatures = [...dataFetched[0].features].sort(
    (a, b) => a.start - b.start
  );

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
  const test = [
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
        query_cov: 1,
        subject_cov: 0.8970588235294118,
        identity: 0.992,
        score: 462,
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
          query_cov: 1,
          subject_cov: 1,
          identity: 1,
          score: 245,
          evalue: 6.31e-86,
          db_xrefs: ["BlastRules:WP_000710826"],
        },
      ],
      genes: ["lsoB"],
      id: "DOGAIAIOFN_2",
      locus: "DOGAIA_02",
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
  ];
  const cds = () => {
    {
      layers.map((layer, index) => {
        return (
          <>
            <g id="cds">
              <text
                x={30}
                y={80}
                fill="black"
                fontSize="12"
                textAnchor="middle"
              >
                CDS/sORF
              </text>
            </g>
            <g key={index}>
              {layer.map((item, i) => {
                const nucleotideWidth = viewWidth / (end - start);

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
                console.log((item.stop - item.start) * nucleotideWidth);
                return (
                  <rect
                    className="hover"
                    key={i}
                    x={start * nucleotideWidth}
                    y={80}
                    width={(item.stop - item.start) * nucleotideWidth}
                    height={40}
                    fill={fillColor}
                  />
                );
              })}
            </g>
          </>
        );
      });
    }
  };

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl mb-4">DNA Viewer</h1>

      <div className="controls mb-4">
        <label htmlFor="zoom">Zoom: </label>
        <input
          type="range"
          id="zoom"
          min="1"
          max="100"
          defaultValue="1"
          step="1"
          onChange={handleZoomChange}
        />
        <br />
        <br />
        <label htmlFor="start">Start:</label>
        <input
          type="number"
          id="start"
          min="0"
          max="2999"
          value={start}
          onChange={(e) => setStart(Number(e.target.value))}
        />
        <label htmlFor="end">End:</label>
        <input
          type="number"
          id="end"
          min="1"
          max="3000"
          value={end}
          onChange={(e) => setEnd(Number(e.target.value))}
        />
        <button
          className="ml-4 px-3 py-1 bg-blue-500 text-white rounded"
          onClick={updateView}
        >
          Go
        </button>
      </div>

      <svg id="dna-viewer" width="1000" height="700">
        <g id="text">{zoomIn()}</g>
        <g id="rect">{first()}</g>
        <g>{cds()}</g>
        <g id="cds">
          <text x={30} y={80} fill="black" fontSize="12" textAnchor="middle">
            CDS/sORF
          </text>
          {layers.map((layer, index) => {
            return (
              <g key={index}>
                {layer.map((item, i) => {
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
                  console.log(item.start);
                  return (
                    <rect
                      className="hover"
                      key={i}
                      x={item.start}
                      y={80}
                      width={((item.stop - item.start) * 1000) / 3000}
                      height={40}
                      fill={fillColor}
                    />
                  );
                })}
              </g>
            );
          })}
        </g>
        <g id="rna">
          <text x={30} y={120} fill="black" fontSize="12" textAnchor="middle">
            CDS/sORF
          </text>
        </g>
        <g id="ncrna">
          <text x={30} y={160} fill="black" fontSize="12" textAnchor="middle">
            CDS/sORF
          </text>
        </g>
        <g id="ncrna-region">
          <text x={30} y={80} fill="black" fontSize="12" textAnchor="middle">
            CDS/sORF
          </text>
        </g>
        <g id="cirspr">
          <text x={30} y={80} fill="black" fontSize="12" textAnchor="middle">
            CDS/sORF
          </text>
        </g>
        <g id="gap">
          <text x={30} y={80} fill="black" fontSize="12" textAnchor="middle">
            CDS/sORF
          </text>
        </g>
        <g id="oriC">
          <text x={30} y={80} fill="black" fontSize="12" textAnchor="middle">
            CDS/sORF
          </text>
        </g>
      </svg>
    </div>
  );
};

export default DNAViewer;
