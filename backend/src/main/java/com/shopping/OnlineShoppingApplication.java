package com.shopping;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OnlineShoppingApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineShoppingApplication.class, args);
        System.out.println("========================================");
        System.out.println("Online Shopping Application Started!");
        System.out.println("Backend running on: http://localhost:8080");
        System.out.println("========================================");
    }
}
