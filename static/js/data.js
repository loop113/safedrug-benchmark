// SafeDrug Benchmark - Dataset Metadata & Examples
// HuggingFace base URL
var HF_BASE = 'https://huggingface.co/datasets/JM00113/SafeDrug/resolve/main/data';

var DATASET_CATEGORIES = [
  {
    id: 'ade_prediction',
    name: 'ADE Prediction',
    nameCN: '不良反应预测',
    description: 'Given a drug (by name and SMILES structure), identify all known adverse drug events (ADEs) from a list of options. Tasks are stratified by patient age group (child, adult, older adult) to evaluate age-specific pharmacological knowledge.',
    subs: [
      {
        id: 'ade_overall',
        name: 'ADE Overall Performance',
        file: 'Large/ade_prediction/ade_prediction_overall/ADE_prediction_Overallperformance.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Multi-label classification (select all correct side effects from A-F options)',
        description: 'General ADE identification across all age groups. Each sample provides a drug name, SMILES structure, and a list of 5-6 potential side effects. The model must select ALL correct side effects.',
        example: {
          instance_id: 819,
          task_instance_id: 819,
          task_name: 'ADE_SideEffect_Identification',
          split: 'val',
          prompt: 'You are an expert specializing in pharmacology and chemistry. You are currently taking a multiple-choice exam designed to test medical knowledge...\n\nContext:\n- Drug: atovaquone\n- SMILES: OC1=C([C@H]2CC[C@@H](CC2)C2=CC=C(Cl)C=C2)C(=O)C2=CC=CC=C2C1=O\n\nTask: Identify known side effects based on standard pharmaceutical literature.\nOptions:\nA. Musculoskeletal discomfort\nB. Dizziness\nC. Hyperglycaemia\nD. Myalgia\nE. Skin disorder\nF. None of the above',
          answer: 'A, B, C, D, E'
        }
      },
      {
        id: 'ade_adult',
        name: 'ADE - Adult',
        file: 'Large/ade_prediction/ade_prediction_age/adult.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Multi-label classification',
        description: 'ADE identification specifically for adult patients. Side effects are filtered to those documented in adult populations only.',
        example: {
          instance_id: 6074,
          task_instance_id: 6074,
          task_name: 'Adult_SideEffect_DBQA',
          split: 'train',
          prompt: 'You are an expert clinical pharmacologist specializing in internal medicine...\n\n[SCENARIO: Adult Case Study - Theoretical]\nPatient Profile: Adult Patient.\nDrug Prescribed: Temsirolimus\nChemical Structure (SMILES): CC1=C(C(=O)NC1=O)N2C=NC=N2...\n\nTask: Identify side effects that are specifically documented or observed in adult populations for this drug.\nOptions:\nA. Pneumatosis intestinalis\nB. Productive cough\nC. Pulmonary oedema\nD. Electrocardiogram T wave amplitude increased\nE. drug fever\nF. None of the above',
          answer: 'B'
        }
      },
      {
        id: 'ade_child',
        name: 'ADE - Child',
        file: 'Large/ade_prediction/ade_prediction_age/child.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Multi-label classification',
        description: 'ADE identification for pediatric patients. Focuses on side effects observed in children, requiring distinct pediatric pharmacology knowledge.',
        example: {
          instance_id: 4012,
          task_instance_id: 4012,
          task_name: 'Child_SideEffect_DBQA',
          split: 'train',
          prompt: 'You are an expert clinical pharmacologist specializing in pediatrics...\n\n[SCENARIO: Pediatric Case Study - Theoretical]\nPatient Profile: Child / Pediatric Patient.\nDrug Prescribed: Pipemidic acid\nChemical Structure (SMILES): C1=CN(C=C(C1=O)C(=O)O)C2=NCCN2...\n\nTask: Identify side effects that are specifically documented or observed in pediatric populations (children) for this drug.\nOptions:\nA. Intestinal gangrene\nB. Stevens-Johnson syndrome\nC. Reversible cerebral vasoconstriction syndrome\nD. Crystal nephropathy\nE. Febrile bone marrow aplasia\nF. None of the above',
          answer: 'B, D'
        }
      },
      {
        id: 'ade_older_adult',
        name: 'ADE - Older Adult',
        file: 'Large/ade_prediction/ade_prediction_age/older_adult.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Multi-label classification',
        description: 'ADE identification for geriatric patients (older adults). Requires knowledge of age-specific adverse drug reactions in elderly populations.',
        example: {
          instance_id: 100,
          task_instance_id: 100,
          task_name: 'OlderAdult_SideEffect_DBQA',
          split: 'train',
          prompt: 'You are an expert clinical pharmacologist specializing in geriatrics...\n\n[SCENARIO: Geriatric Case Study - Theoretical]\nPatient Profile: Older Adult / Geriatric Patient.\nDrug Prescribed: Cefpodoxime\nChemical Structure (SMILES): COC1=CC(=C2C(=O)N(C(=O)C2=O)C(=O)OC(C)C)C=C1...\n\nTask: Identify side effects that are specifically documented or observed in older adult populations for this drug.\nOptions:\nA. Clostridium difficile colitis\nB. Pseudomembranous colitis\nC. Acute generalised exanthematous pustulosis\nD. Coombs positive haemolytic anaemia\nE. Eosinophilic pneumonia\nF. None of the above',
          answer: 'A, B'
        }
      }
    ]
  },
  {
    id: 'ade_risk_prediction',
    name: 'ADE Risk Prediction',
    nameCN: '不良反应风险预测',
    description: 'Given a drug and a specific adverse drug event, predict the occurrence frequency category according to CIOMS standard definitions (Very common to Very rare). Uses data from the OFFSIDES and SIDER pharmacovigilance databases.',
    subs: [
      {
        id: 'offsides_risk',
        name: 'OFFSIDES Risk',
        file: 'Large/ade_risk_prediction/offsides/offsides_risk_dataset.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Single-label classification (A-E: Very common to Very rare)',
        description: 'ADE frequency classification using the OFFSIDES database. Given a drug (name + SMILES) and an observed ADE, predict the frequency category: A (Very common >=10%), B (Common 1-10%), C (Uncommon 0.1-1%), D (Rare 0.01-0.1%), E (Very rare <0.01%).',
        example: {
          instance_id: 13434,
          task_instance_id: 13434,
          task_name: 'OFFSIDES_Frequency_Classification',
          split: 'train',
          prompt: 'You are an expert clinical pharmacologist and toxicologist...\n\n[SCENARIO: Pharmacovigilance Risk Assessment]\nDrug Prescribed: carvedilol\nChemical Structure (SMILES): COC1=CC=CC=C1OCCNCC(O)COC1=CC=CC2=C1C1=CC=CC=C1N2\nAdverse Drug Event (ADE): Basal ganglia haemorrhage\n\nTask: Based on standard pharmaceutical labeling and clinical data, predict the occurrence frequency category...\nA. Very common (>= 10%)\nB. Common (1% to < 10%)\nC. Uncommon (0.1% to < 1%)\nD. Rare (0.01% to < 0.1%)\nE. Very rare (< 0.01%)',
          answer: 'D'
        }
      },
      {
        id: 'sider_risk',
        name: 'SIDER Risk',
        file: 'Large/ade_risk_prediction/sider/sider_risk_dataset.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Single-label classification (A-E)',
        description: 'ADE frequency classification using the SIDER database. Same CIOMS frequency categories as OFFSIDES but drawn from a different pharmacovigilance data source.',
        example: {
          instance_id: 500,
          task_instance_id: 500,
          task_name: 'SIDER_Frequency_Classification',
          split: 'train',
          prompt: 'You are an expert clinical pharmacologist and toxicologist...\n\n[SCENARIO: Pharmacovigilance Risk Assessment]\nDrug Prescribed: Metformin\nChemical Structure (SMILES): CN(C)C(=N)NC(=N)N\nAdverse Drug Event (ADE): Lactic acidosis\n\nTask: Based on standard pharmaceutical labeling and clinical data, predict the occurrence frequency category...\nA. Very common (>= 10%)\nB. Common (1% to < 10%)\nC. Uncommon (0.1% to < 1%)\nD. Rare (0.01% to < 0.1%)\nE. Very rare (< 0.01%)',
          answer: 'D'
        }
      }
    ]
  },
  {
    id: 'ddi_prediction',
    name: 'DDI Prediction',
    nameCN: '药物相互作用预测',
    description: 'Given a pair of drugs (Drug A and Drug B), identify the primary pharmacological interaction type between them. Options include absorption, distribution, metabolism, excretion, synergy, antagonism, and others.',
    subs: [
      {
        id: 'ddi_type',
        name: 'DDI Type Prediction',
        file: 'Large/ddi_prediction/ddi_prediction.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Single-label classification (A-E, varies by sample)',
        description: 'Drug-drug interaction type classification. Each sample presents two drugs and asks the model to identify the primary PK/PD interaction mechanism.',
        example: {
          instance_id: 194161,
          task_instance_id: 194161,
          task_name: 'DDI_Type_Prediction',
          split: 'train',
          prompt: 'You are an expert clinical pharmacologist and toxicologist...\n\n[SCENARIO: Drug-Drug Interaction (DDI) Assessment - Theoretical]\nDrug A: Erythromycin\nDrug B: Vincristine (liposome)\n\nTask: Identify the primary pharmacological interaction type or mechanism between Drug A and Drug B.\n\nOptions:\nA. Metabolism\nB. Unknown\nC. Others\nD. Distribution\nE. Absorption',
          answer: 'A'
        }
      }
    ]
  },
  {
    id: 'ddi_risk_prediction',
    name: 'DDI Risk Prediction',
    nameCN: '药物相互作用风险预测',
    description: 'Given a drug pair and their known interaction type, predict the clinical severity (risk level) of the interaction: Major, Moderate, or Minor.',
    subs: [
      {
        id: 'ddi_severity',
        name: 'DDI Severity Prediction',
        file: 'Large/ddi_risk_prediction/ddi_risk_prediction.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Single-label classification (A-C: Major/Minor/Moderate)',
        description: 'DDI severity assessment. Given two drugs and their interaction type, predict the clinical risk level that would appear on drug labels.',
        example: {
          instance_id: 233879,
          task_instance_id: 233879,
          task_name: 'DDI_Severity_Prediction',
          split: 'test',
          prompt: 'You are an expert clinical pharmacologist and toxicologist...\n\n[SCENARIO: Drug-Drug Interaction (DDI) Risk Assessment - Theoretical]\nDrug A: Succinylcholine\nDrug B: Nitrous oxide\nInteraction Type: Synergy\n\nTask: Predict the clinical severity (risk level) of this specific type of interaction between Drug A and Drug B.\n\nOptions:\nA. Major\nB. Minor\nC. Moderate',
          answer: 'C'
        }
      }
    ]
  },
  {
    id: 'mechanism_prediction',
    name: 'Mechanism Prediction',
    nameCN: '机制预测',
    description: 'Explain the pharmacological mechanism behind a given drug-drug interaction. Select the correct mechanism from a predefined list of 20 mechanism types (e.g., metabolic inhibition, protein binding displacement, QT prolongation).',
    subs: [
      {
        id: 'mechanism_test',
        name: 'Mechanism Explanation (Test)',
        file: 'Large/mechanism_prediction/mechanism_prediction/mechanism_explanation_test_with_steps.json',
        format: 'json',
        fields: ['id', 'instruction', 'question', 'answer', 'evidence'],
        taskType: 'Single-label classification (select from 20 mechanisms)',
        description: 'Given two drugs, identify the DDI mechanism from 20 predefined categories including metabolic_inhibition, metabolic_induction, transporter_inhibition, protein_binding_displacement, additive_hepatotoxicity, QT_prolongation, pharmacodynamic_synergy/antagonism, and more. Includes evidence chains for each answer.',
        example: {
          id: 'MECH_106880',
          instruction: 'Explain the mechanism of the drug-drug interaction.',
          question: 'What is the mechanism behind the interaction between Benzylpenicillin and Troleandomycin?\nFrom the list, provide only the likely mechanism (matching one of the given mechanisms): [metabolic_inhibition, metabolic_induction, transporter_inhibition, transporter_induction, exposure_increase, exposure_decrease, absorption_increase, absorption_decrease, protein_binding_displacement, renal_excretion_inhibition, renal_excretion_increase, additive_hepatotoxicity, additive_nephrotoxicity, additive_cns_depression, additive_bleeding_risk, qt_prolongation, pharmacodynamic_synergy, pharmacodynamic_antagonism, therapeutic_duplication, unknown]\n Output format: absorption_increase',
          answer: 'pharmacodynamic_antagonism',
          evidence: [
            'Although some in vitro data indicate synergism between macrolide antibiotics and penicillins, other in vitro data indicate antagonism.',
            'When these drugs are given together, neither has predictable therapeutic efficacy.',
            'Data are available for erythromycin, although theoretically this interaction could occur with any macrolide.'
          ]
        }
      },
      {
        id: 'mechanism_train',
        name: 'Mechanism Explanation (Train)',
        file: 'Large/mechanism_prediction/mechanism_prediction/mechanism_explanation_train_with_steps.json',
        format: 'json',
        fields: ['id', 'instruction', 'question', 'answer', 'evidence'],
        taskType: 'Single-label classification',
        description: 'Training split for mechanism explanation. Same format as test set.',
        example: null
      },
      {
        id: 'mechanism_dev',
        name: 'Mechanism Explanation (Dev)',
        file: 'Large/mechanism_prediction/mechanism_prediction/mechanism_explanation_dev_with_steps.json',
        format: 'json',
        fields: ['id', 'instruction', 'question', 'answer', 'evidence'],
        taskType: 'Single-label classification',
        description: 'Development/validation split for mechanism explanation. Same format as test set.',
        example: null
      }
    ]
  },
  {
    id: 'multiple_drug_prediction',
    name: 'Multiple Drug Prediction',
    nameCN: '多药联合预测',
    description: 'Evaluate whether concurrent administration of 3, 4, 5, or 10 drugs leads to clinically significant adverse DDIs. Two sub-tasks: (1) binary DDI prediction (Yes/No), (2) adverse event severity classification (serious/non-serious).',
    subs: [
      {
        id: 'multi_ddi_3',
        name: 'Multiple Drug DDI - 3 Drugs',
        file: 'Large/multiple_drug_prediction/ddi_prediction/3_drug.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Binary classification (Yes/No)',
        description: 'Predict whether 3 co-administered drugs interact to cause a known adverse event.',
        example: {
          instance_id: 11395,
          task_instance_id: 11395,
          task_name: 'Polypharmacy_Interaction_Prediction_3_Drugs',
          split: 'train',
          prompt: 'You are an expert clinical pharmacologist and toxicologist...\n\n[SCENARIO: Polypharmacy Interaction Assessment - Theoretical]\nDrugs Prescribed Concurrently:\n1. Apixaban\n2. Macitentan\n3. Tadalafil\n\nTask: Predict whether the concurrent administration of all these specific drugs together leads to a known significant adverse drug-drug interaction (DDI).\n\nOptions:\nYes\nNo',
          answer: 'Yes'
        }
      },
      {
        id: 'multi_ddi_4',
        name: 'Multiple Drug DDI - 4 Drugs',
        file: 'Large/multiple_drug_prediction/ddi_prediction/4_drug.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Binary classification (Yes/No)',
        description: 'Same task with 4 co-administered drugs, increasing combinatorial complexity.',
        example: null
      },
      {
        id: 'multi_ddi_5',
        name: 'Multiple Drug DDI - 5 Drugs',
        file: 'Large/multiple_drug_prediction/ddi_prediction/5_drug.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Binary classification (Yes/No)',
        description: 'Same task with 5 co-administered drugs.',
        example: null
      },
      {
        id: 'multi_ddi_10',
        name: 'Multiple Drug DDI - 10 Drugs',
        file: 'Large/multiple_drug_prediction/ddi_prediction/10_drug.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Binary classification (Yes/No)',
        description: 'Same task with 10 co-administered drugs — the most challenging polypharmacy scenario.',
        example: null
      },
      {
        id: 'multi_risk_3',
        name: 'Multiple Drug Risk - 3 Drugs',
        file: 'Large/multiple_drug_prediction/ddi_risk_prediction/3_drug.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Binary classification (1=Serious, 2=Non-serious)',
        description: 'Given 3 co-administered drugs and a reported adverse event, classify the event severity as serious or non-serious.',
        example: {
          instance_id: 1,
          task_instance_id: 1,
          task_name: 'Polypharmacy_Risk_Prediction_3_Drugs',
          split: 'train',
          prompt: 'You are an expert clinical pharmacologist and toxicologist...\n\n[SCENARIO: Polypharmacy Adverse Event Risk Assessment - Theoretical]\nDrugs Prescribed Concurrently:\n1. Sodium oxybate\n2. Losartan\n3. Milnacipran\n\nReported Adverse Event: Condition aggravated\n\nTask: Predict the severity of this specific adverse event when it occurs due to the concurrent administration of these drugs.\n\nOptions:\n1. Serious adverse event\n2. Non-serious',
          answer: '2'
        }
      },
      {
        id: 'multi_risk_4',
        name: 'Multiple Drug Risk - 4 Drugs',
        file: 'Large/multiple_drug_prediction/ddi_risk_prediction/4_drug.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Binary classification',
        description: 'Same severity classification with 4 drugs.',
        example: null
      },
      {
        id: 'multi_risk_5',
        name: 'Multiple Drug Risk - 5 Drugs',
        file: 'Large/multiple_drug_prediction/ddi_risk_prediction/5_drug.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Binary classification',
        description: 'Same severity classification with 5 drugs.',
        example: null
      },
      {
        id: 'multi_risk_10',
        name: 'Multiple Drug Risk - 10 Drugs',
        file: 'Large/multiple_drug_prediction/ddi_risk_prediction/10_drug.jsonl',
        format: 'jsonl',
        fields: ['instance_id', 'task_instance_id', 'prompt', 'task_name', 'split', 'answer'],
        taskType: 'Binary classification',
        description: 'Same severity classification with 10 drugs.',
        example: null
      }
    ]
  },
  {
    id: 'substitution_prediction',
    name: 'Substitution Prediction',
    nameCN: '替代药物预测',
    description: 'Given a drug with a known interaction, select the best replacement drug from multiple candidates. Requires understanding of both the interaction mechanism and therapeutic alternatives.',
    subs: [
      {
        id: 'substitution_test',
        name: 'Drug Replacement (Test)',
        file: 'Large/substitution_prediction/substitution_prediction/drug_replace_mcq_test.json',
        format: 'json',
        fields: ['id', 'Instruction', 'Question', 'Answer', 'Evidence'],
        taskType: 'Multiple choice (A-F)',
        description: 'Given a source drug with a reported interaction, choose the best replacement from 6 candidates. Each question includes the interaction severity context and evidence chains supporting the correct answer.',
        example: {
          id: 'REPL_064955_B',
          Instruction: 'Choose the best replacement drug from the options.',
          Question: 'Choline salicylate has a reported interaction with Tolbutamide (severity: Moderate). Which of the following is the best replacement for Choline salicylate?\nA. Brodalumab\nB. Atorvastatin\nC. Meropenem\nD. Ziconotide\nE. Methylene blue\nF. Pegvisomant',
          Answer: { label: 'D', text: 'Ziconotide' },
          Evidence: [
            'The hypoglycemic effect of insulin secretagogues (e.g., sulfonylureas, meglitinides) may be potentiated by certain drugs, including salicylates...',
            'These drugs may increase the risk of hypoglycemia by enhancing insulin sensitivity, stimulating insulin secretion, decreasing insulin clearance...'
          ]
        }
      },
      {
        id: 'substitution_train',
        name: 'Drug Replacement (Train)',
        file: 'Large/substitution_prediction/substitution_prediction/drug_replace_mcq_train.json',
        format: 'json',
        fields: ['id', 'Instruction', 'Question', 'Answer', 'Evidence'],
        taskType: 'Multiple choice (A-F)',
        description: 'Training split for drug replacement.',
        example: null
      },
      {
        id: 'substitution_dev',
        name: 'Drug Replacement (Dev)',
        file: 'Large/substitution_prediction/substitution_prediction/drug_replace_mcq_dev.json',
        format: 'json',
        fields: ['id', 'Instruction', 'Question', 'Answer', 'Evidence'],
        taskType: 'Multiple choice (A-F)',
        description: 'Development/validation split for drug replacement.',
        example: null
      }
    ]
  },
  {
    id: 'ddi_agent_eval',
    name: 'DDI Agent Evaluation (Clean Splits)',
    nameCN: 'DDI智能体评估（标准划分）',
    description: 'A curated, cleanly-split evaluation set for DDI-related agent tasks. Contains standardized train/dev/test splits with structured model input/output format. Includes 11 subtasks spanning classification, multi-label, multi-choice, span selection, and generation.',
    subs: [
      {
        id: 'agent_train',
        name: 'Agent Eval - Train',
        file: 'Small/splits_clean/splits_clean/ddi_agent_eval_train.jsonl',
        format: 'jsonl',
        fields: ['id', 'task_tier', 'task_name', 'task_format', 'model_input', 'label', 'answer', 'scoring_hint'],
        taskType: 'Various (classification, multi_label, multi_choice, span_selection, generation)',
        description: 'Training split. Tasks include: interaction_check, severity_classification, interaction_type_classification, risk_label_selection, management_action_classification, alternative_drug_selection, evidence_selection, mechanism_span_selection, management_rationale_selection, mechanism_reasoning, evidence_reasoning.',
        example: {
          id: 'ddinter_53948_interaction_check_1',
          task_tier: 'objective',
          task_name: 'interaction_check',
          task_format: 'classification',
          model_input: {
            instruction: 'Decide whether the drug pair has a clinically relevant DDI.',
            query: 'Check whether there is a clinically meaningful interaction between Desmopressin and Diclofenac.',
            question: 'Is there a clinically meaningful interaction between Desmopressin and Diclofenac?',
            context: { drug_a: 'Desmopressin', drug_b: 'Diclofenac' },
            options: [{ id: 'yes', text: 'Yes' }, { id: 'no', text: 'No' }]
          },
          label: 'yes',
          answer: 'Yes',
          scoring_hint: { metric: 'accuracy' }
        }
      },
      {
        id: 'agent_dev',
        name: 'Agent Eval - Dev',
        file: 'Small/splits_clean/splits_clean/ddi_agent_eval_dev.jsonl',
        format: 'jsonl',
        fields: ['id', 'task_tier', 'task_name', 'task_format', 'model_input', 'label', 'answer', 'scoring_hint'],
        taskType: 'Various',
        description: 'Development split for model selection and hyperparameter tuning.',
        example: null
      },
      {
        id: 'agent_test',
        name: 'Agent Eval - Test',
        file: 'Small/splits_clean/splits_clean/ddi_agent_eval_test.jsonl',
        format: 'jsonl',
        fields: ['id', 'task_tier', 'task_name', 'task_format', 'model_input', 'label', 'answer', 'scoring_hint'],
        taskType: 'Various',
        description: 'Test split for final evaluation. Hold-out set, not used during development.',
        example: null
      }
    ]
  }
];

// HuggingFace dataset page (data is in data.zip - individual files not directly downloadable)
var HF_DATASET_URL = 'https://huggingface.co/datasets/JM00113/SafeDrug';

// Helper: get download URL (points to dataset page; user can extract file from data.zip)
function getDownloadUrl(filePath) {
  return HF_DATASET_URL;
}

// Helper: get expected path within the zip for reference
function getZipPath(filePath) {
  return 'data/' + filePath;
}
