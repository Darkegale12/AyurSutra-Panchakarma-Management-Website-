package com.example.SIH.Service;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SIH.Dao.PatientDao;
import com.example.SIH.Entity.DoctorEntity;
import com.example.SIH.Entity.Patient;

@Service
public class PatientService {

    @Autowired
    private PatientDao dao;

    @Autowired
    private EmailService emailService;

    public String insert_patient(Patient patient) {
        return dao.insert_patient(patient);
    }

    @Autowired
    private SessionFactory factory;
    public List<Patient> login(String name, String password) {
        Session session = factory.openSession();
        Criteria criteria = session.createCriteria(Patient.class);
        criteria.add(Restrictions.eq("name", name));
        criteria.add(Restrictions.eq("password", password));
        List<Patient> patients = criteria.list();
        session.close();
        return patients;
    }

    @Transactional
    public String scheduleMappingByName(String patientName, String docName) {
        Patient patient = dao.findByName(patientName);
        if (patient == null) return "Patient not found";

        DoctorEntity doctor = dao.findDoctorByName(docName);
        if (doctor == null) return "Doctor not found";

        // Add many-to-many mapping
        doctor.getPatients().add(patient);
        patient.getDoctors().add(doctor);

        // Persist both entities
        dao.saveDoctor(doctor);
        dao.savePatient(patient);

        // Send email
        emailService.sendAppointmentMail(patient, doctor);

        return "Appointment booked with Dr. " + doctor.getDocName() +
               " & email sent to " + patient.getEmail();
    }

    // Update progress
    @Transactional
    public int updateProgress(String patientName, String progress) {
        return dao.updateProgress(patientName, progress);
    }

    // Get doctors by location
    public List<Object[]> getDoctornameByLocation(String address) {
        return dao.getDoctornameByLocation(address);
    }

    // Give feedback (update progress)
    @Transactional
    public String giveFeedback(String patientName, String progress) {
        int updated = dao.updateProgress(patientName, progress);
        if (updated == 0) return "Patient not found";
        return "Feedback updated successfully for " + patientName;
    }
    public String sendMailToPatient(String patientName) {
        Patient patient = dao.findByName(patientName);

        // If patient not found, use hardcoded email
        if (patient == null) {
            patient = new Patient();
            patient.setName(patientName);
            patient.setEmail("hardcoded_email@example.com");
        }

        emailService.sendAppointmentMail(patient);
        return "Email sent to " + patient.getEmail();
    }
}
