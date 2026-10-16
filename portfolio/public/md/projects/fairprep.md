# FairPrep: fairness-aware human feedback for table unionability

Co-first-author paper submitted to DASHSys 2026.

- Problem: Human feedback supervises table union search in data lakes, but nobody had checked whether it is equally reliable across annotator demographics.
- What she did: Adapted the FairEM framework to annotator-level fairness with 10 metrics, permutation tests, bootstrap intervals and FDR correction on 60 annotators.
- What changed: 6 of 10 metrics flagged bias against non-native English annotators, 25% versus 44% accuracy on hard questions, p = 0.031.

> The first adaptation of the FairEM framework from entity matching to annotator-level fairness in table union search, finding statistically significant bias against non-native English annotators on hard questions.

- Kind: Research
- Period: Jan 2025 to May 2026 (completed)
- Affiliation: Worcester Polytechnic Institute, BSF Grant 2024022
- Team: Shreya Boyane with Nina Klimenkova, Dr. Roee Shraga
- Repository: https://github.com/Sonica-B/FairPrep

## Problem

Human feedback supervises table union search in modern data lakes, but nobody had checked whether that feedback is equally reliable across annotator demographics.

## Approach

Nine source modules across five experimental phases on a 480-row dataset; 10 FairEM confusion-matrix metrics, 10,000-shuffle permutation tests, 10,000-resample stratified bootstrap intervals, Fisher exact tests, Benjamini-Hochberg FDR correction and dual-track logistic regression.

## Results

- 6 of 10 FairEM metrics flag unfairness against non-native English annotators.
- 25% versus 44% accuracy on hard questions, Fisher exact p = 0.031.
- Found the non-native, lower-education, young intersection persists at p_BH = 0.037 after FDR correction.
- Held across 5 of 5 orthogonal cleaning strategies; behavioral disparities exceed demographic ones.

## Key numbers

- Annotators: 60
- Metrics flagging unfairness: 6 of 10
- Accuracy gap on hard questions: 25% vs 44%
- Fisher exact p: 0.031

## Stack

Python, statsmodels, scikit-learn, permutation testing, bootstrap, FDR correction, fairness

## Publication

Toward Fairness-Aware Human Feedback for Table Unionability. Submitted, DASHSys 2026, May 2026. Authors: Nina Klimenkova, Shreya Sanjay Boyane, Roee Shraga. First adaptation of the FairEM framework from entity matching to annotator-level fairness in table union search, showing that human feedback should be treated as conditionally reliable.

- Code: https://github.com/Sonica-B/FairPrep

Canonical page: https://shreyaboyane.dev/projects/fairprep. This markdown: https://shreyaboyane.dev/md/projects/fairprep.md. Generated from the site content model, last updated 2026-10-15.
