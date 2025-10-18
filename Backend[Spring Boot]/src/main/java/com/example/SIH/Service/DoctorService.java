package com.example.SIH.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SIH.Dao.DoctorDao;
import com.example.SIH.Entity.DoctorEntity;

@Service
public class DoctorService {

	@Autowired
	DoctorDao dao;
	
	public String insert_doc(DoctorEntity obj) {
	return	dao.insert_doc(obj);
		
		
	}

	public String findByNameAndPassword(String name, String password) {
        DoctorEntity user = dao.findByNameAndPassword(name, password);

        if (user == null) {
            return "User not present";
        } else {
            return "User present";
        }
    }

	

	public List getClientsForDoctor(String docname) {
		return dao.getClientsForDoctor(docname);
		
	}
	
	public  DoctorEntity searchdoctorbyname(String docName) {
		return dao.searchdoctorbyname(docName);
	}
  
}
