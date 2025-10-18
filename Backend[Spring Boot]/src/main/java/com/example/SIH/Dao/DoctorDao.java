package com.example.SIH.Dao;



import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.SIH.Entity.DoctorEntity;

@Repository
public class DoctorDao {

	@Autowired
	SessionFactory sf;
	
	public String insert_doc(DoctorEntity obj) {
		Session session=sf.openSession();
		session.save(obj);
		session.beginTransaction().commit();
		session.close();
		return "Data Inserted Successfully";
	
	}

	public DoctorEntity findByNameAndPassword(String name, String password) {
	    Session session = sf.openSession();
	    Criteria cr = session.createCriteria(DoctorEntity.class);
	    cr.add(Restrictions.eq("DocName", name));
	    cr.add(Restrictions.eq("password", password));

	    DoctorEntity user = (DoctorEntity) cr.uniqueResult();
	    session.close();

	    return user;
	}

	public List getClientsForDoctor(String docname) {
		 Session session = sf.openSession();
		    Criteria cr = session.createCriteria(DoctorEntity.class);
		    cr.add(Restrictions.eq("DocName", docname)); 
		    cr.setProjection(Projections.property("patient_info"));
		    List clients = cr.list();
		    session.close();

		    return clients;
	}

	
	  
	public DoctorEntity searchdoctorbyname(String docName) {
	    Session session = sf.openSession();

	    Criteria criteria = session.createCriteria(DoctorEntity.class);
	    criteria.add(Restrictions.eq("docName", docName));
	    criteria.setMaxResults(1);
	    DoctorEntity  doctor1 = (DoctorEntity) criteria.uniqueResult();
	    
	    return doctor1;
	}

}
 