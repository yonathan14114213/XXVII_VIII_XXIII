import { log } from "console";

class Person{
    firstName: string;
    lastName: string;

    constructor(firstName:string, lastName:string){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Patient extends Person{
    patientID: number;
    constructor (patientID: number, firstName:string, lastName:string){
        super(firstName, lastName);
        this patientID = patientID;
    }
    patientData(){
        return {name: this.firstName+ this.lastName,
            id: this.patientID}
    }
}

class Doctor extends Person{
    doctorID:number;
    specialization:string;
    constructor(firstName:string, lastName:string, doctorID:number, specialization:string){
        super(firstName, lastName);
        this.doctorID = doctorID;
        this.specialization = specialization;
    }
    doctorData(){
        return {
            name: this.firstName+this.lastName, 
            id: this.doctorID,
            specialization:this.specialization
        }
    }
}

class Appointment{
    patient:Patient;
    doctor:Doctor;
    date: string;
    time:string;
    constructor(patient:Patient, doctor:Doctor, date:string, time: string){
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
    }
    appointmentData(){
        return {
            patient: this.patient.patientData(),
            doctor: this.doctor.doctorData(),
            date:this.date,
            time:this.time
        }
    }
}

class Hospital {
    patientArray: Patient[];
    doctorArray: Doctor[];
    appointmentArray: Appointment[];
    name: string;
    constructor(patientArray: Patient[], doctorArray:Doctor[], appointmentArray: Appointment[], name:string) {
        this.patientArray = patientArray;
        this.doctorArray = doctorArray;
        this.appointmentArray = appointmentArray;
        this.name = name;
    }
    addPatient(patient:Patient){
        this.patientArray.push(patient);
    }
    addDoctor(doc:Doctor){
        this.doctorArray.push(doc);
    }
    addApointment(appointment:Appointment){
        this.appointmentArray.push(appointment);
    }
    allApointments(){
        return this.appointmentArray;
    }
    appointmentOfDoctor(id:number){
        for (let i = 0; i < this.appointmentArray.length; i++) {
            if (this.appointmentArray[i].doctor.doctorID === id) {
                return this.appointmentArray[i];
            }
        }
    }
    appointmentOfPatient(id:number){
        for (let i = 0; i < this.appointmentArray.length; i++) {
            if (this.appointmentArray[i].patient.patientID === id){
                return this.appointmentArray[i];
            }
        }
    }
    appointmentOfDay(day:string){
        return this.appointmentArray.filter(appointment=>appointment.date === day);
    }
}

const patient1 = new Patient(0, 'harry', 'potter');
const patient2 = new Patient(1, 'mr', 'haid');
const patient3 = new Patient(2, 'daffy', 'duck');
const doctor1 = new Doctor('bags', 'bunny', 0, 'madness/carrots');
const doctor2 = new Doctor('john', 'dolitell', 1, 'veterian');
const doctor3 = new Doctor('henry', 'jekil', 2, 'ciemstry');
const appointment1 = new Appointment(patient1, doctor1, 'may the thitrty-fifth', 'five minutes before noon');
const appointment2 = new Appointment(patient3, doctor2, 'yesterday', '2 pm');
const appointment3 = new Appointment(patient2, doctor3, 'today', '13:72 pm');
const appointment4 = new Appointment(patient1, doctor3, 'sunday', '11:65 am');
const appointment5 = new Appointment(patient2, doctor2, '35/5', '12:00:00');
const appointment6 = new Appointment(patient3, doctor3, 'tow weeks agow', '21:78:54');

const hospital1 = new Hospital([patient1], [doctor1], [appointment1], 'asaf-ha-hole');
const hospital2 = new Hospital([patient1, patient2, patient3], [doctor1, doctor2, doctor3], [appointment1,appointment4, appointment5], 'horev Hospital')

hospital1.addDoctor(doctor2);
hospital1.addPatient(patient2);
hospital1.addDoctor(doctor3);
hospital1.addPatient(patient3);

hospital1.addApointment(appointment2);
hospital1.addApointment(appointment3);
hospital2.addApointment(appointment6);


console.log('all appointments:', hospital1.allApointments());
console.log("Dr bags bunny's appointments", hospital1.appointmentOfDoctor(2));
console.log("mr potter appointments:", hospital2.appointmentOfPatient(0));
