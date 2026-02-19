package lk.ijse.backend.controller;

import lk.ijse.backend.dto.CustomerDTO;
import lk.ijse.backend.entity.Customer;
import lk.ijse.backend.service.impl.CustomerServiceIMPL;
import lk.ijse.backend.util.APIResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/customers")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Validated

public class CustomerController {
    private final CustomerServiceIMPL customerServiceIMPL;

    @PostMapping
    public ResponseEntity<APIResponse<String>> saveCustomer(@RequestBody CustomerDTO customerDTO) {
        customerServiceIMPL.saveCustomer(customerDTO);
        return new ResponseEntity<>(new APIResponse<>(201,"Customer saved Successfully",null), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<APIResponse<String>> updateCustomer(@RequestBody CustomerDTO customerDTO) {
        customerServiceIMPL.updateCustomer(customerDTO);
        return new ResponseEntity<>(new APIResponse<>(200,"Customer updated Successfully",null), HttpStatus.OK);
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<APIResponse<String>> deleteCustomer(@PathVariable long customerId) {
        customerServiceIMPL.deleteCustomer(customerId);
        return new ResponseEntity<>(new APIResponse<>(200,"Customer deleted Successfully",null), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<APIResponse<List<CustomerDTO>>> getAllCustomers() {
        List<CustomerDTO> customers = customerServiceIMPL.getAllCustomer();
        return new ResponseEntity<>(new APIResponse<>(200,"Customer List Successfully",customers), HttpStatus.OK);
    }
}
