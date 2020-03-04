public class FetchDataTable {
	@AuraEnabled
    public static List<Student__c> fetchAccount(){
        return [Select Student_Id__c, Name, Img_Url__c, Gender__c, Semester__c from Student__c Limit 8];
    }

    @AuraEnabled
    public static void DeleteRecord(String delId){
        List<Student__c> dataToDelete = new List<Student__c> ([Select Id from Student__c Where Id=:delID]);
        delete dataToDelete;
    }

    @AuraEnabled
    public static void batchDeleteRecord(List<Student__c> mewmew){
        
        delete mewmew;
    }

    @AuraEnabled
    public static void batchDeleteRecordFromCustomTableCmp(List<String> listOfIds){
        
        //delete listOfIds;

        List < Student__c > lstDeleteRec = [select Id from Student__c where id IN: listOfIds];

        delete lstDeleteRec;
    }

    @AuraEnabled
   public static List<Student__c> getAccountList(Integer dLimit,Integer dOffset){
    List<Student__c> accountList=new List<Student__c>([Select Id, Name, Img_Url__c, Gender__c, Semester__c from Student__c limit :dLimit offset :dOffset]);
    return accountList;
}

    

 
 }