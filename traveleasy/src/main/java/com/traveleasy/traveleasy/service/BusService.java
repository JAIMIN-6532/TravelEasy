package com.traveleasy.traveleasy.service;

import com.traveleasy.traveleasy.model.Bus;
import com.traveleasy.traveleasy.repository.BusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusService {

    private final BusRepo busRepo;

    @Autowired
    public BusService(BusRepo busRepo){
        this.busRepo = busRepo;
    }

    public Bus addBus(Bus bus){
        return busRepo.save(bus);
    }

    // Get all buses
    public List<Bus> getAllBuses() {
        return busRepo.findAll();
    }

    public List<Bus> findBusesBySourceAndDestination(String source, String destination) {
        return busRepo.findBySourceAndDestination(source, destination);
    }

}
