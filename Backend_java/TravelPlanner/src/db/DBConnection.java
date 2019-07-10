package db;

import java.util.List;

import org.bson.types.ObjectId;

import entity.Place;

public interface DBConnection {
	public void close();
	
	public String getFullName(String userId);
	
	public boolean verifyLogin(String userId, String password);
	
	public void saveRoutes(List<Place> places, String userId, int ith);
	
	// unsave route is for the show routes page
	public void unsaveRoutes(String userId, ObjectId routesId);
	
	public void getRoutes(String userId);
	
	public List<String> savePlaces(List<Place> places);
	
	public boolean registerUser(String userId, String password, String firstname, String lastname);

}
