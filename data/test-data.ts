export default class TestData {
    static makeApntmntData(){
        return [
            {testId: "TC1", facility: "Seoul CURA Healthcare Center", hcp: "Medicaid", visitDt: "05/10/2025"},
            {testId: "TC2", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visitDt: "05/11/2025"},
            {testId: "TC3", facility: "Hongkong CURA Healthcare Center", hcp: "None", visitDt: "05/12/2025"}
        ]
    }
}