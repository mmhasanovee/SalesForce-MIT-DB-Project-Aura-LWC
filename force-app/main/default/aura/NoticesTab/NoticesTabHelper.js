({
    loadTabs: function (cmp, event) {
        var tab = event.getSource();
        switch (tab.get('v.id')) {
            case 'post':
                this.injectComponent('c:PostNewNoticeLDS', tab);
                break;
            case 'list':
                this.injectComponent('c:FetchNoticesLDS', tab);
                break;
            case 'weather':
                this.injectComponent('c:weatherApi', tab);
                break;
            case 'studentInfo':
                this.injectComponent('c:FetchStudentInformationLazyDT', tab);
                break;
            case 'insertStudent':
                this.injectComponent('c:InsertNewStudentDataW', tab);
                break;

        }
    },
    injectComponent: function (name, target) {
        $A.createComponent(name, {
        }, function (contentComponent, status, error) {
            if (status === "SUCCESS") {
                target.set('v.body', contentComponent);
            } else {
                throw new Error(error);
            }
        });
    }
})