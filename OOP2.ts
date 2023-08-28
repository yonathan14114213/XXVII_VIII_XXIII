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
    status: 'done' | 'waiting' | 'cancle';
    constructor(patient:Patient, doctor:Doctor, date:string, time: string, age:number, status:'done'|'waiting'|'cancle'){
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
        this.status = status;
        
    }
    orderLine(){this.status = 'waiting'};
    finishLine(){this.status = 'done'};
    cancleLine(){this.status = 'cancle'};
    appointmentData () {
        return {
            patient: this.patient.patientData(),
            doctor: this.doctor.doctorData(),
            date:this.date,
            time:this.time
        }
    }
}
class MedicalRecord {
    patient:Patient;
    doctor:Doctor;
    diagnosis:string;
    prescription:string;
    constructor(patient:Patient, doctor:Doctor, diagnosis:string, prescription:string){
        this.patient = patient;
        this.doctor = doctor;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
    }
}
class Hospital {
    patientArray: Patient[];
    doctorArray: Doctor[];
    appointmentArray: Appointment[];
    record:MedicalRecord[];
    name: string;
    constructor(patientArray: Patient[], doctorArray:Doctor[], appointmentArray: Appointment[], name:string, record:MedicalRecord[]) {
        this.patientArray = patientArray;
        this.doctorArray = doctorArray;
        this.appointmentArray = appointmentArray;
        this.name = name;
        this.record = record;
    }
    addPatient(patient:Patient){
        this.patientArray.push(patient);
    } addDoctor(doc:Doctor){
        this.doctorArray.push(doc);
    } addAppointment(appointment:Appointment){
        const arr = this.appointmentArray.filter(element => element.date === appointment.date
            && element.time === appointment.time);
        if (arr.length !== 0){return "this appointment is already catch";
        } else if (appointment.patient.getData().age<appointment.doctor.maxRange &&
            appointment.patient.getData().age>appointment.doctor.minRange){
            this.appointmentArray.push(appointment);
            appointment.status = 'waiting';
        }else {return `wer'e sorry, but Dr ${appointment.doctor.getData().name} isn't taking care of patients in this age`}
    }
    createMedicalRecord(rec:MedicalRecord){this.record.push(rec)}
    getMedicalRecords(id:number){
        return this.record.filter(rec=>rec.patient.patientID ===id)
    }
    specialDoctors(special){
        return this.doctorArray.filter(doctor=>doctor.doctorData().specialization===special);
    }
    allApointments(){
        return this.appointmentArray;
    }
    appointmentOfDoctor(id:number){
        return this.appointmentArray.filter(appoint => appoint.doctor.doctorID === id);
    }
    appointmentOfPatient(id:number){
        return this.appointmentArray.filter(appoint => appoint.patient.patientID === id);
    }
    appointmentOfDay(day:string){
        return this.appointmentArray.filter(appointment=>appointment.date === day);
    }
    getDoctorSchedule(day:string, id:number){
        return this.appointmentOfDoctor(id).filter(appointment=>appointment.date === day && appointment.status === 'waiting');
    }
    getDoctorAvailability(day:string, id:number){
        return this.appointmentOfDoctor(id).filter(appointment=>appointment.date === day && appointment.status === 'cancle');
    }
}
