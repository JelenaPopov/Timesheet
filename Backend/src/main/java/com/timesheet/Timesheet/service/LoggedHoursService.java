package com.timesheet.Timesheet.service;

import com.timesheet.Timesheet.domain.LoggedHours;
import com.timesheet.Timesheet.repository.LoggedHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;

@Service
public class LoggedHoursService implements GenericService<LoggedHours,Long>{

    private final LoggedHoursRepository repository;

    @Autowired
    public LoggedHoursService(LoggedHoursRepository repository) {
        this.repository = repository;
    }

    @Override
    public LoggedHours save(LoggedHours loggedHours) {
        return repository.save(loggedHours);
    }

    @Override
    public LoggedHours findById(Long id) {
        return repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Page<LoggedHours> findAll(Integer pageNo, Integer pageSize) {
        return repository.findAll(PageRequest.of(pageNo, pageSize));
    }

    public Page<LoggedHours> findUserLogs(Integer pageNo, Integer pageSize, LocalDate created, Long userId) {
        return repository.findUserLogs(PageRequest.of(pageNo, pageSize), created, userId);
    }

    public List<LoggedHours> findAll(LocalDate startDate, LocalDate endDate, Long userId){
        return repository.findAll(startDate, endDate, userId);
    }

    @Override
    public void delete(LoggedHours loggedHours) {
        loggedHours.setDeleted(true);
        repository.save(loggedHours);
    }
}
