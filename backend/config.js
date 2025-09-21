module.exports = {
  "as_hr_02": {
    template: "as_hr_02.html",
    sections: [
      {
        title: "Key Body Vitals",
        fields: [
          { label: "Overall Health Score", path: "accuracy", unit: "%", classify: true, ranges: [{ value: 0, label: "Poor" }, { value: 50, label: "Fair" }, { value: 75, label: "Good" }] },
          { label: "Heart Rate", path: "vitalsMap.vitals.heart_rate", unit: "bpm" },
          { label: "Blood Pressure (Systolic)", path: "vitalsMap.vitals.bp_sys", unit: "mmHg" },
          { label: "Blood Pressure (Diastolic)", path: "vitalsMap.vitals.bp_dia", unit: "mmHg" },
        ],
      },
      {
        title: "Heart Health",
        fields: [
          { label: "Stress Index", path: "vitalsMap.metadata.heart_scores.stress_index" },
          { label: "HRR (Heart Rate Recovery)", path: "vitalsMap.metadata.heart_scores.HRR", unit: "bpm" },
          { label: "RMSSD", path: "vitalsMap.metadata.heart_scores.rmssd" },
        ],
      },
      {
        title: "Fitness Levels",
        fields: [
          { label: "Cardiovascular Endurance", path: "exercises[2].setList[0].time", unit: "seconds", classify: true, ranges: [{ value: 0, label: "Low" }, { value: 50, label: "Average" }, { value: 60, label: "High" }] },
          { label: "Squat Reps", path: "exercises[3].setList[0].totalReps", unit: "reps" },
        ],
      },
      {
        title: "Body Composition",
        fields: [
          { label: "BMI", path: "bodyCompositionData.BMI", classify: true, ranges: [{ value: 0, label: "Underweight" }, { value: 18.5, label: "Healthy" }, { value: 25, label: "Overweight" }, { value: 30, label: "Obese" }] },
          { label: "Body Fat %", path: "bodyCompositionData.BFC", unit: "%" },
          { label: "Lean Mass Index (LMI)", path: "bodyCompositionData.LMI" },
        ],
      },
      {
        title: "Posture Analysis",
        fields: [
          { label: "Frontal View Score", path: "exercises[0].analysisScore", unit: "%" },
          { label: "Side View Score", path: "exercises[1].analysisScore", unit: "%" },
        ],
      },
    ],
  },
  "as_card_01": {
    template: "as_card_01.html",
    sections: [
      {
        title: "Key Body Vitals",
        fields: [
          { label: "Heart Rate", path: "vitalsMap.vitals.heart_rate", unit: "bpm" },
          { label: "Blood Pressure (Systolic)", path: "vitalsMap.vitals.bp_sys", unit: "mmHg" },
          { label: "Blood Pressure (Diastolic)", path: "vitalsMap.vitals.bp_dia", unit: "mmHg" },
        ],
      },
      {
        title: "Cardiovascular Endurance",
        fields: [
          { label: "VO2 Max", path: "vitalsMap.metadata.physiological_scores.vo2max", unit: "ml/kg/min" },
          { label: "PRQ (Pulse-Respiration Quotient)", path: "vitalsMap.metadata.cardiovascular.prq" },
        ],
      },
      {
        title: "Body Composition",
        fields: [
          { label: "BMI", path: "bodyCompositionData.BMI" },
          { label: "Body Fat %", path: "bodyCompositionData.BFC", unit: "%" },
        ],
      },
    ],
  },
};