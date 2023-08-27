"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Person;
}());
var Patient = /** @class */ (function (_super) {
    __extends(Patient, _super);
    function Patient(patientID, firstName, lastName) {
        var _this = _super.call(this, firstName, lastName) || this;
        _this;
        patientID = patientID;
        return _this;
    }
    Patient.prototype.patientData = function () {
        return { name: this.firstName + this.lastName,
            id: this.patientID };
    };
    return Patient;
}(Person));
var Doctor = /** @class */ (function (_super) {
    __extends(Doctor, _super);
    function Doctor(firstName, lastName, doctorID, specialization) {
        var _this = _super.call(this, firstName, lastName) || this;
        _this.doctorID = doctorID;
        _this.specialization = specialization;
        return _this;
    }
    Doctor.prototype.doctorData = function () {
        return {
            name: this.firstName + this.lastName,
            id: this.doctorID,
            specialization: this.specialization
        };
    };
    return Doctor;
}(Person));
var Appointment = /** @class */ (function () {
    function Appointment(patient, doctor, date, time) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
    }
    Appointment.prototype.appointmentData = function () {
        return {
            patient: this.patient.patientData(),
            doctor: this.doctor.doctorData(),
            date: this.date,
            time: this.time
        };
    };
    return Appointment;
}());
var Hospital = /** @class */ (function () {
    function Hospital(patientArray, doctorArray, appointmentArray, name) {
        this.patientArray = patientArray;
        this.doctorArray = doctorArray;
        this.appointmentArray = appointmentArray;
        this.name = name;
    }
    Hospital.prototype.addPatient = function (patient) {
        this.patientArray.push(patient);
    };
    Hospital.prototype.addDoctor = function (doc) {
        this.doctorArray.push(doc);
    };
    Hospital.prototype.addApointment = function (appointment) {
        this.appointmentArray.push(appointment);
    };
    Hospital.prototype.allApointments = function () {
        return this.appointmentArray;
    };
    Hospital.prototype.appointmentOfDoctor = function (id) {
        for (var i = 0; i < this.appointmentArray.length; i++) {
            if (this.appointmentArray[i].doctor.doctorID === id) {
                return this.appointmentArray[i];
            }
        }
    };
    Hospital.prototype.appointmentOfPatient = function (id) {
        for (var i = 0; i < this.appointmentArray.length; i++) {
            if (this.appointmentArray[i].patient.patientID === id) {
                return this.appointmentArray[i];
            }
        }
    };
    Hospital.prototype.appointmentOfDay = function (day) {
        return this.appointmentArray.filter(function (appointment) { return appointment.date === day; });
    };
    return Hospital;
}());

var patient1 = new Patient(0, 'harry', 'potter');
var patient2 = new Patient(1, 'mr', 'haid');
var patient3 = new Patient(2, 'daffy', 'duck');

var doctor1 = new Doctor('bags', 'bunny', 0, 'madness/carrots');
var doctor2 = new Doctor('john', 'dolitell', 1, 'veterian');
var doctor3 = new Doctor('henry', 'jekil', 2, 'ciemstry');

var appointment1 = new Appointment(patient1, doctor1, 'may the thitrty-fifth', 'five minutes before noon');
var appointment2 = new Appointment(patient3, doctor2, 'yesterday', '2 pm');
var appointment3 = new Appointment(patient2, doctor3, 'today', '13:72 pm');
var appointment4 = new Appointment(patient1, doctor3, 'sunday', '11:65 am');
var appointment5 = new Appointment(patient2, doctor2, '35/5', '12:00:00');
var appointment6 = new Appointment(patient3, doctor3, 'tow weeks agow', '21:78:54');

var hospital1 = new Hospital([patient1], [doctor1], [appointment1], 'asaf-ha-hole');
var hospital2 = new Hospital([patient1, patient2, patient3], [doctor1, doctor2, doctor3], [appointment1, appointment4, appointment5], 'horev Hospital');

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
