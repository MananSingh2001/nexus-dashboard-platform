package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "widgets")
@Data
public class Widget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String entryPointUrl;
    private String requiredRole;
    
    @Column(columnDefinition = "text")
    private String configSchema;
}