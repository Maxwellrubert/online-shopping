package com.shopping.controller;

import com.shopping.entity.SellerDetails;
import com.shopping.service.SellerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sellers")
@CrossOrigin(origins = "http://localhost:3000")
public class SellerDetailsController {

    @Autowired
    private SellerDetailsService sellerService;

    @GetMapping
    public List<SellerDetails> getAllSellers() {
        return sellerService.getAllSellers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SellerDetails> getSellerById(@PathVariable Integer id) {
        Optional<SellerDetails> seller = sellerService.getSellerById(id);

        if (seller.isPresent()) {
            return ResponseEntity.ok(seller.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<SellerDetails> createSeller(@RequestBody SellerDetails seller) {
        SellerDetails savedSeller = sellerService.createSeller(seller);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSeller);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SellerDetails> updateSeller(
            @PathVariable Integer id,
            @RequestBody SellerDetails sellerDetails) {

        SellerDetails updatedSeller = sellerService.updateSeller(id, sellerDetails);

        if (updatedSeller != null) {
            return ResponseEntity.ok(updatedSeller);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Integer id) {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public long getSellerCount() {
        return sellerService.countSellers();
    }
}

