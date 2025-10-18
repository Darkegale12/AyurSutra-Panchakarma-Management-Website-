package com.example.SIH.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.SIH.Entity.DoctorEntity;
import com.example.SIH.Service.DoctorService;

@RestController 
public class DoctorController {

	
	@Autowired
	DoctorService service;
	
	@PostMapping("insertingDoctor")
	public String insert_doc(@RequestBody DoctorEntity obj) {
	return	service.insert_doc(obj);
	}
	
	
	@GetMapping("login/{name}/{password}")
	public String login( @PathVariable String name,  @PathVariable String password) {
		return service.findByNameAndPassword(name, password);
	}
	
	 @GetMapping("clientsInfo/{docname}")
	    public List getHomePage(@PathVariable String docname) { 
	        return service.getClientsForDoctor(docname);
	    }
	 @GetMapping("/doctorgo/{docName}")
	    public String bookAppointment(@PathVariable("docName") String docName) {
	        
	        DoctorEntity doctor = service.searchdoctorbyname(docName);
	        if (doctor == null) {
	            return "Doctor not found";
	        }  
	        return "Name: " + doctor.getDocName() + "\n"+
	               "Address: " + doctor.getAddress() + "\n"+
	               "Qualification: " + doctor.getQualification() +"\n" +
	               "Experience: " + doctor.getExperience() + " years\n" +
	               "Phone: " + doctor.getPhoneNo();
	    }
}
