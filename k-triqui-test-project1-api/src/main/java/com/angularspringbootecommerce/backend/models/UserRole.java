package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Data
@Entity
@Table(name = "user_roles")
@AllArgsConstructor
public class UserRole implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="role_id")
    private Long id;
    private String authority;
    public UserRole(){
        super();
    }

//    public UserRole(String authority){
//        this.authority = authority;
//    }
//    public UserRole(Long id, String authority){
//        this.id = id;
//        this.authority = authority;
    }

//    @Override
//    public String getAuthority() {
//        return this.authority;
//    }
//
//    public void setAuthority(String authority){
//        this.authority = authority;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }

