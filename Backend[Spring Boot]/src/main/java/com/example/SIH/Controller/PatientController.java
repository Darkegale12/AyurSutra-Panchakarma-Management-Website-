package com.example.SIH.Controller;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.SIH.Entity.Patient;
import com.example.SIH.Service.PatientService;

@RestController
public class PatientController {
	
	@Autowired
	PatientService service;
	
	@PostMapping("insert_patient")
	public String insert_patient(@RequestBody Patient obj)
	{
		return service.insert_patient(obj);
	}
	
	@PostMapping("/login/{name}/{password}")
	public ResponseEntity<?> login(
	        @PathVariable String name, 
	        @PathVariable String password,
	        HttpSession session) { // inject session
	    List<Patient> patients = service.login(name, password);

	    if (patients != null && !patients.isEmpty()) {
	        // store patient object in session
	        session.setAttribute("user", patients.get(0));

	        // return success response
	        return ResponseEntity.ok(Map.of(
	            "status", "success",
	            "name", patients.get(0).getName(),
	            "email", patients.get(0).getEmail()
	        ));
	    } else {
	        return ResponseEntity.status(401).body(Map.of("status", "failure"));
	    }
	}



	
	@GetMapping("getDoctornameByLocation/{address}")
	public List<Object[]> getDoctornameByLocation(@PathVariable String address ){
		return service.getDoctornameByLocation(address);
		
		
	}

	@PostMapping("schedule_mapping/{docName}")
	public String scheduleMapping(@AuthenticationPrincipal org.springframework.security.core.userdetails.User user,
	                              @PathVariable String docName) {
	    String patientName = user.getUsername(); // logged-in patient
	    return service.scheduleMappingByName(patientName, docName);
	}


	
	@PostMapping("/giveFeedback/{progress}")
	public String giveFeedback(@PathVariable String progress) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String username = auth.getName(); // get logged-in user

	    return service.giveFeedback(username, progress);
	}

	
	   @PostMapping("/sendMail/{patientName}")
	    public String sendMail(@PathVariable String patientName) {
	        return service.sendMailToPatient(patientName);
	    }

}