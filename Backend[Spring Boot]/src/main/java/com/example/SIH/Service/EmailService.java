package com.example.SIH.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.SIH.Entity.DoctorEntity;
import com.example.SIH.Entity.Patient;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendAppointmentMail(Patient patient) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(patient.getEmail());
        message.setSubject("Panchakarma Consultation & Therapy Appointment Confirmation");

        String body = "Dear " + patient.getName() + ",\n\n"
                + "We are pleased to inform you that your appointment has been successfully scheduled.\n\n"
                + "📅 Date & Time: 20th September, 4:00 PM\n"
                + "Consulting Doctor: Dr. Priti More\n"
                + "Address: Dhanvantaray Clinic, Kothrud, Pune – 411038\n\n\n"
                + "🔗 Doctor’s Qualifications & Profile: [https://mcimindia.co.in/VerifyRMP.aspx?REGNO=69047&KEY=52624]\n\n"
                + "──────────────────────────────\n"
                + " Pre-Session Recommendations\n"
                + "──────────────────────────────\n"
                + "1. Eat light before your session.\n"
                + "2. Stay hydrated with water.\n"
                + "3. Wear comfortable clothing.\n\n"
                + "We look forward to guiding you through a rejuvenating Panchakarma experience.\n\n\n\n"
             
                + "-AyurSutra";

        message.setText(body);
        mailSender.send(message);
    }
    public void sendAppointmentMail(Patient patient, DoctorEntity doctor) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(patient.getEmail());
        message.setSubject("Panchakarma Consultation & Therapy Appointment Confirmation");

        // Build a beautiful dynamic email body
        String body = "Dear " + patient.getName() + ",\n\n"
                + "We are pleased to inform you that your appointment has been successfully scheduled.\n\n"
                + "📅 Date & Time: 20th September, 4:00 PM\n" // you can make this dynamic later
                + "Consulting Doctor: Dr. " + doctor.getDocName() + "\n"
                + "Address: " + doctor.getClinic_name() + ", " + doctor.getAddress() + "\n\n"
                + "🔗 Doctor’s Qualifications & Profile: " + doctor.getDoc_info() + "\n\n"
                + "──────────────────────────────\n"
                + " Pre-Session Recommendations\n"
                + "──────────────────────────────\n"
                + "1. Eat light before your session.\n"
                + "2. Stay hydrated with water.\n"
                + "3. Wear comfortable clothing.\n\n"
                + "We look forward to guiding you through a rejuvenating Panchakarma experience.\n\n\n\n"
                + "-AyurSutra";

        message.setText(body);
        mailSender.send(message);
    }


}
