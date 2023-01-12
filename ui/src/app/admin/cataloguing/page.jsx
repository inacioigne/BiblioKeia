"use client";
// MUI Components
import { Container, Box, Divider, Typography } from "@mui/material";
import {
  AutoStories,
  LibraryBooks,
  CollectionsBookmark,
  Article,
  Home,
} from "@mui/icons-material/";

// Next Components
import { usePathname } from "next/navigation";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import CardCataloguing from "src/components/cards/cardCataloguing";

const previousPaths = [
  {
    link: "admin",
    label: "Início",
    icon: <Home fontSize="small" />,
  },
];

export default function Cataloguing() {
  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK
          previousPaths={previousPaths}
          currentPath="Catalogação"
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        Bibframe
      </Typography>
      <Divider />
      <Box sx={{ py: "1rem", display: "flex", justifyContent: "space-around" }}>
        <CardCataloguing
          name="Livros"
          link="admin/cataloguing/book"
          Icon={AutoStories}
        />
        <CardCataloguing
          name="Teses"
          link="admin/cataloguing/book"
          Icon={LibraryBooks}
        />
        <CardCataloguing
          name="Períodicos"
          link="admin/cataloguing/book"
          Icon={CollectionsBookmark}
        />
        <CardCataloguing
          name="Artigos"
          link="admin/cataloguing/book"
          Icon={Article}
        />
      </Box>
    </Container>
  );
}
