abstract class Person{
    #firstName: string;
    #lastName: string;
    #age:number;
    #address:string;
    constructor(firstName:string, lastName:string, age:number, address:string){
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#age = age;
        this.#address = address;
    }
    getData(){
        return {name: this.#firstName+" "+this.#lastName, age: this.#age, address:this.#address};
    }
}

class Patient extends Person{
    patientID: number;
    phoneNumber:number;
    emergencyContact:string;
    medicalHistory:Appointment[];
    constructor (patientID: number, phoneNumber:number, emergencyContact:string, medicalHistory:Appointment[], firstName:string, lastName:string, age:number, address:string){
        super(firstName, lastName, age, address);
        this.patientID = patientID;
        this.phoneNumber = phoneNumber;
        this.emergencyContact = emergencyContact;
        this.medicalHistory = medicalHistory;
    }
    patientData(){
        return {name: this.getData().name,
            age: this.getData().age,
            address:this.getData().address,
            id: this.patientID,
            phoneNumber: this.phoneNumber,
            emergencyContact:this.emergencyContact,
            medicalHistory:this.medicalHistory
        }
    }
    setHistory(appointment:Appointment){
        this.medicalHistory.push(appointment)
    }
}
class MedicalStaff extends Person{
    staffId:number;
    position:string;
    department:string;
    constructor(staffId:number, position:string, department:string, firstName:string, lastName:string, age:number, address:string) {
        super(firstName, lastName, age, address);
        this.staffId = staffId;
        this.position = position;
        this.department = department
    }
}
interface line {
    date: string;
    hour: string;
    length: 60;
}
class Doctor extends MedicalStaff{
    doctorID:number;
    specialization:string;
    minRange: number;
    maxRange:number;
    availability:line[];
    constructor(firstName:string, lastName:string, doctorID:number, specialization:string, minRange:number, maxRnge:number, age:number, address:string, staffId:number, position:string, department:string){
        super(staffId, position, department,firstName, lastName, age, address);
        this.doctorID = doctorID;
        this.specialization = specialization;
        this.minRange = minRange;
        this.maxRange = maxRnge;
    }
    doctorData(){
        return {
            name: this.getData().name,
            age:this.getData().age,
            address:this.getData().address,
            id: this.doctorID,
            specialization:this.specialization,
            staffId:this.staffId,
            position:this.position,
            department:this.department
        }
    }
}

class Appointment{
    patient:Patient;
    doctor:Doctor;
    date: string;
    time:string;
    constructor(patient:Patient, doctor:Doctor, date:string, time: string, age:number){
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
        
    }
    /*
    check(){
        const age = this.patient.getData().age;
        const minRange = this.doctor.minRange;
        const maxRange = this.doctor.maxRange;
        if (age < minRange|| age > maxRange){
            return `wer'e sorry, Dr ${this.doctor.getData.name} isn't taking care for patients in this age`
        }}
    */
    appointmentData () {
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
