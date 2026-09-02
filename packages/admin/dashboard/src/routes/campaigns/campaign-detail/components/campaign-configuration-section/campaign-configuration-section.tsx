import { HttpTypes } from "@medusajs/types"
import { Button, Container, Heading } from "@medusajs/ui"

import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { DateRangeDisplay } from "../../../../../components/common/date-range-display"

type CampaignConfigurationSectionProps = {
  campaign: HttpTypes.AdminCampaign
}

export const CampaignConfigurationSection = ({
  campaign,
}: CampaignConfigurationSectionProps) => {
  const { t } = useTranslation()

  return (
    <Container className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Heading level="h2">{t("campaigns.configuration.header")}</Heading>
        <Button size="small" variant="secondary" asChild>
          <Link to="configuration">{t("actions.edit")}</Link>
        </Button>
      </div>
      <DateRangeDisplay
        startsAt={campaign.starts_at}
        endsAt={campaign.ends_at}
        showTime
      />
    </Container>
  )
}
