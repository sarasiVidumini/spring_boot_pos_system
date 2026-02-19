package lk.ijse.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class CustomerDTO {

    @Pattern(regexp = "^\\d+$", message = "Customer ID must be a valid integer")
    private Long id;

    @NotBlank(message = "Customer name cannot be blank")
    private String name;

    @NotBlank(message = "Customer address cannot be blank")
    @Size(min = 10, message = "Customer address should be least character long")
    private String address;
}
