import { Box } from "@chakra-ui/react";
import owner1 from "../assets/owner1.png";
import owner2 from "../assets/owner2.png";
import owner3 from "../assets/owner3.png";
import { BsTwitterX, BsLinkedin, BsInstagram } from "react-icons/bs";
import Owner from "./Owner";

const ownerData = [
  {
    id: 1,
    ownerPhoto: owner1,
    ownerName: "John Doe",
    ownerTitle: "Founder & Chairman",
    ownerSocialMedia: [BsTwitterX, BsInstagram, BsLinkedin],
  },
  {
    id: 2,
    ownerPhoto: owner2,
    ownerName: "John Doe",
    ownerTitle: "Managing Director",
    ownerSocialMedia: [BsTwitterX, BsInstagram, BsLinkedin],
  },
  {
    id: 3,
    ownerPhoto: owner3,
    ownerName: "John Doe",
    ownerTitle: "Product Designer",
    ownerSocialMedia: [BsTwitterX, BsInstagram, BsLinkedin],
  },
];

const Owners = () => {
  return (
    <Box display={{base: "block", md: "flex", lg: "flex"}} marginTop={10}>
      {ownerData.map((owner) => (
        <Owner
          key={owner.id}
          ownerPhoto={owner.ownerPhoto}
          ownerName={owner.ownerName}
          ownerTitle={owner.ownerTitle}
          ownerSocialMedia={owner.ownerSocialMedia}
        />
      ))}
    </Box>
  );
};

export default Owners;
