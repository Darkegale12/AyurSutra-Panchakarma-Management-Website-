package com.example.SIH.Config;

import com.example.SIH.Entity.Patient;
import com.example.SIH.Dao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PatientDetailsService implements UserDetailsService {

    @Autowired
    private PatientDao patientRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Patient patient = patientRepository.findByName(name);
        if (patient == null) {
            throw new UsernameNotFoundException("Patient not found with name: " + name);
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(patient.getName())
                .password(patient.getPassword())
                .roles("PATIENT")
                .build();
    }
}

