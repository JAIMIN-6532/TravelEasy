package com.traveleasy.traveleasy.repository;

import com.traveleasy.traveleasy.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepo extends JpaRepository<Bus, Long>  {
    List<Bus> findBySourceAndDestination(String source, String destination);
}
