public class CRUD {
    @AuraEnabled
    public static List<Notice__c> fetchNotices(){
        return [Select Name, Priority__c, Id from Notice__c];
    }

    @AuraEnabled
    public static String delNotice(String idToDelete){
        List < Notice__c > deleteNotice = new List<Notice__c> ([select Id from Notice__c where Id=:idToDelete]);
        delete deleteNotice;
        return idToDelete;
    }

    @AuraEnabled
    public static Student__c insertStudentMethod(Student__c data){
        insert data;
        return data;
    }
}