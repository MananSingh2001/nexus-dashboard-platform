package com.example.demo.controller;

import com.example.demo.model.Widget;
import com.example.demo.repository.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/widgets")
@CrossOrigin(origins = "http://localhost:3000") 
public class WidgetController {

    @Autowired
    private WidgetRepository repository;

    @GetMapping
    public List<Widget> getWidgets() {
        return repository.findAll();
    }
}