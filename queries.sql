-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

select
  p.productname, c.categoryname
from product p
join category c
    on p.CategoryId = c.id;


-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

select
 o.id, orderDate, companyName 
from [Order] as o
left join shipper as s
    on o.shipvia = s.id
where orderDate < '2012-08-09'
order by orderDate desc;


-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

select
 productName, od.quantity
from orderdetail as od
join product as p
    on productid = p.id
where od.orderid = 10251
order by productName;



-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

select
  o.id as 'Order ID', c.companyName as 'Company Name', e.lastName as 'Employee Last Name'
from [order] as o
join customer as c
    on o.customerid = c.id
join employee as e
    on o.employeeid = e.id;