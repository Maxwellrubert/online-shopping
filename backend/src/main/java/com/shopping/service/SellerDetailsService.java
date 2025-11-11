package com.shopping.service;

import com.shopping.entity.SellerDetails;
import com.shopping.repository.SellerDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellerDetailsService {

    @Autowired
    private SellerDetailsRepository sellerRepository;

    public List<SellerDetails> getAllSellers() {
        return sellerRepository.findAll();
    }

    public Optional<SellerDetails> getSellerById(Integer id) {
        return sellerRepository.findById(id);
    }

    public SellerDetails createSeller(SellerDetails seller) {
        return sellerRepository.save(seller);
    }

    public SellerDetails updateSeller(Integer id, SellerDetails sellerDetails) {
        Optional<SellerDetails> existingSellerOpt = sellerRepository.findById(id);

        if (existingSellerOpt.isPresent()) {
            SellerDetails existingSeller = existingSellerOpt.get();

            existingSeller.setName(sellerDetails.getName());
            existingSeller.setAddress(sellerDetails.getAddress());
            existingSeller.setEmail(sellerDetails.getEmail());
            existingSeller.setPassword(sellerDetails.getPassword());
            existingSeller.setPhone(sellerDetails.getPhone());
            existingSeller.setStatusId(sellerDetails.getStatusId());

            return sellerRepository.save(existingSeller);
        }

        return null;
    }

    public void deleteSeller(Integer id) {
        sellerRepository.deleteById(id);
    }

    public long countSellers() {
        return sellerRepository.count();
    }
}

