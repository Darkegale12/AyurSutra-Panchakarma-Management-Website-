package com.example.SIH.Dao;

import java.util.List;
import java.util.Optional;

import javax.persistence.Query;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.SIH.Entity.DoctorEntity;
import com.example.SIH.Entity.Patient;

@Repository
public class PatientDao {

    @Autowired
    private SessionFactory factory;

    // Insert a patient
    public String insert_patient(Patient patient) {
        Session session = factory.openSession();
        session.beginTransaction();
        session.save(patient);
        session.getTransaction().commit();
        session.close();
        return "Patient inserted successfully";
    }

    // Login
    @SuppressWarnings("unchecked")
    public List<Patient> login(String name, String password) {
        Session session = factory.openSession();
        Criteria criteria = session.createCriteria(Patient.class);
        criteria.add(Restrictions.eq("name", name));
        criteria.add(Restrictions.eq("password", password));
        List<Patient> patients = criteria.list();
        session.close();
        return patients;
    }

    // Find patient by name (primary key)
    public Patient findByName(String name) {
        Session session = factory.openSession();
        Patient patient = session.get(Patient.class, name);
        session.close();
        return patient;
    }

    // Find patient by email
    public Optional<Patient> findByEmail(String email) {
        Session session = factory.openSession();
        Criteria criteria = session.createCriteria(Patient.class);
        criteria.add(Restrictions.eq("email", email));
        Patient patient = (Patient) criteria.uniqueResult();
        session.close();
        return Optional.ofNullable(patient);
    }

    // Find doctor by name
    public DoctorEntity findDoctorByName(String docName) {
        Session session = factory.openSession();
        DoctorEntity doctor = session.get(DoctorEntity.class, docName);
        if (doctor != null) {
            doctor.getPatients().size(); // initialize patients collection
        }
        session.close();
        return doctor;
    }

    // Get doctor list by location
    @SuppressWarnings("unchecked")
    public List<Object[]> getDoctornameByLocation(String address) {
        Session session = factory.openSession();
        Criteria cr = session.createCriteria(DoctorEntity.class)
                .setProjection(Projections.projectionList()
                        .add(Projections.property("docName"))
                        .add(Projections.property("clinic_name"))
                        .add(Projections.property("phoneNo")))
                .add(Restrictions.eq("address", address));
        List<Object[]> result = cr.list();
        session.close();
        return result;
    }

    // Save or update patient
    public void savePatient(Patient patient) {
        Session session = factory.openSession();
        session.beginTransaction();
        session.saveOrUpdate(patient);
        session.getTransaction().commit();
        session.close();
    }

    // Save or update doctor
    public void saveDoctor(DoctorEntity doctor) {
        Session session = factory.openSession();
        session.beginTransaction();
        session.saveOrUpdate(doctor);
        session.getTransaction().commit();
        session.close();
    }

    // Update progress
    public int updateProgress(String name, String progress) {
        Session session = factory.openSession();
        session.beginTransaction();
        Query query = session.createQuery("UPDATE Patient p SET p.progress = :progress WHERE p.name = :name");
        query.setParameter("progress", progress);
        query.setParameter("name", name);
        int updatedRows = query.executeUpdate();
        session.getTransaction().commit();
        session.close();
        return updatedRows;
    }
}
