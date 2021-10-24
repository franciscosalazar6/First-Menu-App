
class Student {
    constructor (name) {
        this.name = name;
    }

    describe () {
        return ` ${this.name}.`
    }
}

class Classes {
    constructor (name) {
        this.name = name;
        this.students = [];
    }

    addStudent (students) {
        if(students instanceof Classes) {
            this.students.push(students);
        } else {
            throw new Error ( `You can only add an instance of Students. Argument is not a Student: ${students} `);
        }
    }

    describe () {
        return `${this.name} has ${this.students.length}  as students.`;
    }
}

class Menu {
    constructor () {
        this.classes = [];
        this.selectedClasses = null;
    }

    start () {
        let selection = this.showEnrollmentOptions();
        
        while (selection != 0) {
             switch (selection) {
                case '1':
                     this.createClass();
                     break; 
                case  '2':
                    this.viewClass();
                    break;
                case '3':
                    this.deleteClass();
                    break;
                case '4':
                    this.displayClasses();
                    break;
                default:
                    selection = 0;

                
             }
             selection = this.showEnrollmentOptions();
        }
        alert('Goodbye!');
    }

    showEnrollmentOptions() {
        return prompt(`
        0) exit
        1) create new Class
        2) view Classes
        3) delete Class
        4) display Classes
        `)
    }

showClassEnrollmentOptions(classInfo) {
    return prompt(`
    0) back
    1) add student
    2) remove student
    ------------------
    ${classInfo}
    `)
}

    displayClasses() {
        let classesString = '';
        for (let i = 0; i < this.classes.length; i++) {
            classesString += i + ') ' + this.classes[i].name + '\n';
        }
        alert(classesString);
    }

    createClass() {
        let name = prompt('Enter the name for Class:');
        this.classes.push(new Classes(name));
    }

    viewClass() {
        let index = prompt('Enter the index of the class you wish to view:');
        if(index > -1 && this.classes.length) {
            this.selectedClasses = this.classes[index];
            let description = 'Class: ' + this.selectedClasses.name + '\n';

            for(let i = 0; i < this.selectedClasses.students.length; i++) {
                description += i + ') ' + this.selectedClasses.students[i].name
                 + '  ';
            }

            let selection = this.showClassEnrollmentOptions(description);
            switch (selection) {
                case '1':
                    this.addStudent();
                    break;
                case '2':
                    this.removeStudent();
            }
        }
    }

    deleteClass() {
        let index = prompt('Enter the index of the class you wish to delete:');
        if(index > -1 && index < this.classes.length) {
            this.classes.splice(index, 1);
        }
    }

    addStudent() {
        let name = prompt('Enter name for new student:');
        this.selectedClasses.students.push(new Student(name));
    }

    removeStudent() {
        let index = prompt('Enter the index of the student you wish to remove from the class:');
        if( index > -1 && index < this.selectedClasses.students.length) {
            this.selectedClasses.students.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();