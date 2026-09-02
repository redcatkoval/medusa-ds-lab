import { ShoppingBag } from "@medusajs/icons"
import { Button, Container, Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { SidebarLink } from "../../../../../components/common/sidebar-link/sidebar-link"
import { ExtendedProduct } from "../../constants"

type ProductShippingProfileSectionProps = {
  product: ExtendedProduct
}

export const ProductShippingProfileSection = ({
  product,
}: ProductShippingProfileSectionProps) => {
  const { t } = useTranslation()

  const shippingProfile = product.shipping_profile

  return (
    <Container className="p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("products.shippingProfile.header")}</Heading>
        <Button size="small" variant="secondary" asChild>
          <Link to="shipping-profile">{t("actions.edit")}</Link>
        </Button>
      </div>

      {shippingProfile && (
        <SidebarLink
          to={`/settings/locations/shipping-profiles/${shippingProfile.id}`}
          labelKey={shippingProfile.name}
          descriptionKey={shippingProfile.type}
          icon={<ShoppingBag />}
        />
      )}
    </Container>
  )
}
