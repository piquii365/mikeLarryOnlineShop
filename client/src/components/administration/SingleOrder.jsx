import { useCallback, useEffect, useState, Suspense } from "react";
import axios from "../../api/axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  ButtonGroup,
  Button,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  List,
  CardActions,
  Divider,
  Link,
  Menu,
} from "@mui/material";

const SingleOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const search = useOutletContext();
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get("/Orders/all", {
        withCredentials: true,
      });
      if (response.data.status) {
        setOrders(response.data.Orders);
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/admin", {
          state:
            "Permission to access resources has been denied login to confirm identity",
        });
      }
    }
  }, []);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const handleDelete = (order) => {
    const id = order._id;
    axios
      .delete(`/orders/delete/${id}`)
      .then((result) => {
        if (result.data.status) {
          location.reload();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <Suspense fallback={<Typography>Loading</Typography>}>
        {orders.length === 0 ? (
          <Box>
            <Typography>You have not received any orders yet</Typography>
          </Box>
        ) : (
          <Box>
            <Table sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              <TableHead>
                <TableRow>
                  <TableCell component={"th"}>No</TableCell>
                  <TableCell component={"th"}>Buyer Email</TableCell>
                  <TableCell component={"th"}>Phone Number</TableCell>
                  <TableCell component={"th"}>Address</TableCell>
                  <TableCell component={"th"}>Items</TableCell>
                  <TableCell component={"th"}>Payment Status</TableCell>
                  <TableCell component={"th"}>Payment Ref</TableCell>
                  <TableCell component={"th"}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  ?.filter((order) => {
                    return search.toLowerCase() === ""
                      ? order
                      : order.buyer.includes(search);
                  })
                  .map((order, index) => (
                    <TableRow key={index}>
                      <TableCell component="td">{index + 1}</TableCell>
                      <TableCell component="td">{order?.buyer}</TableCell>
                      <TableCell component="td">{order?.phoneNumber}</TableCell>
                      <TableCell component="td">{order?.location}</TableCell>
                      <TableCell sx={{ width: "30dvw" }}>
                        <List>
                          {order.items.map((item, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={item.item} />
                              <ListItemText primary={item.color} />
                              <ListItemText primary={item.quantity} />
                            </ListItem>
                          ))}
                        </List>
                      </TableCell>
                      <TableCell component="td">
                        {order?.paymentStatus}
                      </TableCell>
                      <TableCell component="td">
                        {order?.paymentReference}
                      </TableCell>
                      <TableCell component="td">
                        <ButtonGroup>
                          <Button onClick={handleClick}>Edit</Button>
                          <Menu open={openMenu} onClose={handleClose}>
                            <Box>
                              <Typography>Menu Item</Typography>
                            </Box>
                          </Menu>
                          <Button onClick={() => handleDelete(order)}>
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
              <Typography>Current Orders</Typography>
              {orders
                .filter((order) => {
                  return search.toLowerCase() === ""
                    ? order
                    : order.buyer.includes(search);
                })
                .map((order, index) => (
                  <Card
                    sx={{ padding: "0.5em", marginBottom: "1em" }}
                    key={index}
                  >
                    <Typography>Order No: {index + 1}</Typography>
                    <CardContent>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Buyer
                      </Typography>
                      <Link href={`mailto:${order.buyer}`}>{order.buyer}</Link>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Phone Number
                      </Typography>
                      <Link href={`tel:${order.phoneNumber}`}>
                        {order.phoneNumber}
                      </Link>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Address
                      </Typography>
                      <Typography>{order.location}</Typography>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Items
                      </Typography>
                      <Divider />
                      <Box>
                        <List>
                          {order.items.map((item, index) => (
                            <ListItem key={index}>
                              <ListItemText>{item.item}</ListItemText>
                              <ListItemText>{item.quantity}</ListItemText>
                              <ListItemText>{item.color}</ListItemText>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button>Update</Button>

                      <Button onClick={() => handleDelete(order)}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                ))}
            </Box>
          </Box>
        )}
      </Suspense>
    </Box>
  );
};

export default SingleOrder;
