package com.example.SIH.Entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class DoctorEntity {

    @Id
    private String docName;

    @Column(name = "phone_no")
    private long phoneNo;
    private String clinic_name;
    private String address;
    private String qualification;
    private int experience;
    private String password;
    private String doc_info;
    private String theory_progress;
    private String feedback;

    // Many-to-Many with Patient
    @ManyToMany
    @JoinTable(
            name = "doctor_patient",
            joinColumns = @JoinColumn(name = "doctor_id"),
            inverseJoinColumns = @JoinColumn(name = "patient_id")
    )
    private Set<Patient> patients = new HashSet<>();

    // Getters and Setters
    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public long getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(long phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getClinic_name() {
        return clinic_name;
    }

    public void setClinic_name(String clinic_name) {
        this.clinic_name = clinic_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDoc_info() {
        return doc_info;
    }

    public void setDoc_info(String doc_info) {
        this.doc_info = doc_info;
    }

    public String getTheory_progress() {
        return theory_progress;
    }

    public void setTheory_progress(String theory_progress) {
        this.theory_progress = theory_progress;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Set<Patient> getPatients() {
        return patients;
    }

    public void setPatients(Set<Patient> patients) {
        this.patients = patients;
    }

    public void addPatient(Patient patient) {
        this.patients.add(patient); // owning side only
    }


    @Override
    public String toString() {
        return "DoctorEntity [docName=" + docName + ", phoneNo=" + phoneNo +
                ", clinic_name=" + clinic_name + ", address=" + address +
                ", qualification=" + qualification + ", experience=" + experience +
                ", doc_info=" + doc_info + "]";
    }
}
