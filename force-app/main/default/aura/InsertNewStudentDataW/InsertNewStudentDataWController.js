({
    scriptsLoaded: function (component, event, helper) {
        console.log('JS files loading successful');
    },

    selectGender: function (component, event, helper) {

        var genderValue = component.find("genderValue").get("v.value");
        component.set('v.InsertStudent.Gender__c', genderValue);
        var a = component.get('c.fieldValidate');
        $A.enqueueAction(a);

    },

    selectSemester: function (component, event, helper) {

        var semesterValue = component.find("semesterValue").get("v.value");
        //console.log('semvalue', semesterValue);
        component.set('v.InsertStudent.Semester__c', semesterValue);
        var a = component.get('c.fieldValidate');
        $A.enqueueAction(a);

    },

    doSave: function (component, event, helper) {
        var action = component.get('c.insertStudentMethod');
        var conts = component.get('v.InsertStudent');

        action.setParams({
            data: conts
        });

        action.setCallback(
            this,
            function (response) {
                var state = response.getState();

                if (state === 'SUCCESS' || state === 'DRAFT') {

                    //     var responseValue = response.getReturnValue();
                    //    var componentEvent = component.getEvent('quickPlane');
                    //     componentEvent.setParams({
                    //         ContactRecord: responseValue
                    //     });
                    alert('Successfully created new student data');
                    // componentEvent.fire();
                    //getting the component and firing the component from the child component
                } else if (state === 'INCOMPLETE') {
                    console.log('Incomplete');
                } else if (state === 'ERROR') {
                    var errors = response.getError(); //Array of Error
                    console.log('Error: ', errors[0].duplicateResults);
                    console.log('Error: ', errors[0].fieldErrors);
                    console.log('Error: ', errors[0].pageErrors);

                    if (errors || errors[0].message) {
                    }
                }
            },
            'ALL'
        );

        $A.enqueueAction(action);

    },

    fieldValidate: function (component, event, helper) {
        var conts1 = component.get('v.InsertStudent.Name');
        var conts2 = component.get('v.InsertStudent.Semester__c');
        var conts3 = component.get('v.InsertStudent.Gender__c');
        // console.log('conts1:', conts1);
        // console.log('conts2:', conts2);
        // console.log('conts3:', conts3);

        // if (conts1 != '') {
        //     console.log('conts1 is not null');
        // }

        if (conts1 == '' || conts2 == '' || conts3 == '') {

            // console.log('one of them is not null');
            component.set('v.buttonDis', 'true');
        }
        else {
            component.set('v.buttonDis', 'false');
        }

    }
})