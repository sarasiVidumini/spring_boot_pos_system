package lk.ijse.backend.service;

import lk.ijse.backend.dto.CustomerDTO;
import lk.ijse.backend.entity.Customer;

import java.util.List;

public interface CustomerService {

    public void saveCustomer(CustomerDTO customerDTO);

    public void updateCustomer(CustomerDTO customerDTO);

    public void deleteCustomer(long customerId);

    public List<CustomerDTO> getAllCustomer();
}
