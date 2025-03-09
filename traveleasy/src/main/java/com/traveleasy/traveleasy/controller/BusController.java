package com.traveleasy.traveleasy.controller;


import com.traveleasy.traveleasy.dto.BusSearchDto;
import com.traveleasy.traveleasy.model.Bus;
import com.traveleasy.traveleasy.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bus")
public class BusController {
    private final BusService busService;

    @Autowired
    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Bus>> getAllBuses() {
        List<Bus> buses = busService.getAllBuses();
        return ResponseEntity.ok(buses);
    }

    @PostMapping("/add")
    public ResponseEntity<Bus> addBus(@RequestBody Bus bus) {
        Bus newBus = busService.addBus(bus);
        return ResponseEntity.ok(newBus);

    }

    @PostMapping("/search")
    public  ResponseEntity<List<Bus>>getBusesBySearch(@RequestBody BusSearchDto bus){
        System.out.println(bus.getSource());
        List<Bus> buses = busService.findBusesBySourceAndDestination(bus.getSource(),bus.getDestination());
        System.out.println(buses);
        return  ResponseEntity.ok(buses);
    }


}
