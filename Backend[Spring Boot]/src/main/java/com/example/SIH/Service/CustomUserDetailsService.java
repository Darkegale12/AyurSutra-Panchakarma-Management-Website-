package com.example.SIH.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.SIH.Dao.PatientDao;
import com.example.SIH.Entity.Patient;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private PatientDao patientDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Patient> patientOpt = patientDao.findByEmail(email);

        Patient patient = patientOpt.orElseThrow(
            () -> new UsernameNotFoundException("Patient not found with email: " + email)
        );

        return User.withUsername(patient.getEmail())
                .password(patient.getPassword())
                .roles("PATIENT")
                .build();
    }
}
