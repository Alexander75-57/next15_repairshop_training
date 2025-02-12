INSERT INTO custommers(
    first_name, last_name, email, phone, address1, address2, city, state, zip, notes, active, created_at, updated_at
    ) VALUES
        ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '123 Main St', 'Apt 4', 'Springfield', 'IL', '62701', 'First customer', true, now(), now()),
        ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', '456 Elm St', '', 'Columbus', 'OH', '43085', 'Regular customer', true, now(), now()),
        ('Michael', 'Johnson', 'michael.johnson@example.com', '555-555-5555', '789 Oak St', 'Suite 10', 'Austin', 'TX', '73301', 'Loyal customer', true, now(), now()),
        ('Emily', 'Brown', 'emily.brown@example.com', '444-444-4444', '321 Pine St', '', 'Madison', 'WI', '53703', 'Frequent buyer', true, now(), now()),
        ('David', 'Wilson', 'david.wilson@example.com', '222-222-2222', '654 Maple St', 'Unit 2', 'Atlanta', 'GA', '30301', 'New customer', true, now(), now())