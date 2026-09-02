import { Button, Container, Heading } from "@medusajs/ui"

import { InventoryTypes } from "@medusajs/types"
import { SectionRow } from "../../../../../components/common/section"
import { getFormattedCountry } from "../../../../../lib/addresses"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

type InventoryItemAttributeSectionProps = {
  inventoryItem: InventoryTypes.InventoryItemDTO
}

export const InventoryItemAttributeSection = ({
  inventoryItem,
}: InventoryItemAttributeSectionProps) => {
  const { t } = useTranslation()

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("products.attributes")}</Heading>
        <Button size="small" variant="secondary" asChild>
          <Link to="attributes">{t("actions.edit")}</Link>
        </Button>
      </div>
      <SectionRow title={t("fields.height")} value={inventoryItem.height} />
      <SectionRow title={t("fields.width")} value={inventoryItem.width} />
      <SectionRow title={t("fields.length")} value={inventoryItem.length} />
      <SectionRow title={t("fields.weight")} value={inventoryItem.weight} />
      <SectionRow
        title={t("fields.unitOfMeasure")}
        value={inventoryItem.unit_of_measure}
      />
      <SectionRow title={t("fields.midCode")} value={inventoryItem.mid_code} />
      <SectionRow title={t("fields.material")} value={inventoryItem.material} />
      <SectionRow title={t("fields.hsCode")} value={inventoryItem.hs_code} />
      <SectionRow
        title={t("fields.countryOfOrigin")}
        value={getFormattedCountry(inventoryItem.origin_country)}
      />
    </Container>
  )
}
