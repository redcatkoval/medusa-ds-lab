import { DropdownMenu, IconButton, clx } from "@medusajs/ui"

import { EllipsisHorizontal } from "@medusajs/icons"
import { Fragment, PropsWithChildren, ReactNode } from "react"
import { Link } from "react-router-dom"
import { ConditionalTooltip } from "../conditional-tooltip"
import { useDocumentDirection } from "../../../hooks/use-document-direction"

export type Action = {
  icon: ReactNode
  label: string
  disabled?: boolean
  /**
   * Optional tooltip to display when a disabled action is hovered.
   */
  disabledTooltip?: string | ReactNode
  /**
   * Marks the action as destructive, e.g. delete.
   */
  destructive?: boolean
} & (
  | {
      to: string
      onClick?: never
    }
  | {
      onClick: () => void
      to?: never
    }
)

type ActionMenuProps = PropsWithChildren<{
  actions: Action[]
}>

export const ActionMenu = ({ actions, children }: ActionMenuProps) => {
  const direction = useDocumentDirection()
  const inner = children ?? (
    <IconButton size="small" variant="transparent">
      <EllipsisHorizontal />
    </IconButton>
  )

  return (
    <DropdownMenu dir={direction}>
      <DropdownMenu.Trigger asChild>{inner}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {actions.map((action, actionIndex) => {
          const isLastAction = actionIndex === actions.length - 1

          const Wrapper = action.disabledTooltip
            ? ({ children }: { children: ReactNode }) => (
                <ConditionalTooltip
                  showTooltip={action.disabled}
                  content={action.disabledTooltip}
                  side="right"
                >
                  <div>{children}</div>
                </ConditionalTooltip>
              )
            : "div"

          if (action.onClick) {
            return (
              <Fragment key={actionIndex}>
                <Wrapper>
                  <DropdownMenu.Item
                    disabled={action.disabled}
                    onClick={(e) => {
                      e.stopPropagation()
                      action.onClick()
                    }}
                    className={clx(
                      "[&_svg]:text-ui-fg-subtle flex items-center gap-x-2",
                      {
                        "text-ui-fg-error [&_svg]:text-ui-fg-error":
                          action.destructive,
                        "[&_svg]:text-ui-fg-disabled": action.disabled,
                      }
                    )}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </DropdownMenu.Item>
                </Wrapper>
                {!isLastAction && <DropdownMenu.Separator />}
              </Fragment>
            )
          }

          return (
            <Fragment key={actionIndex}>
              <Wrapper>
                <DropdownMenu.Item
                  className={clx(
                    "[&_svg]:text-ui-fg-subtle flex items-center gap-x-2",
                    {
                      "text-ui-fg-error [&_svg]:text-ui-fg-error":
                        action.destructive,
                      "[&_svg]:text-ui-fg-disabled": action.disabled,
                    }
                  )}
                  asChild
                  disabled={action.disabled}
                >
                  <Link to={action.to} onClick={(e) => e.stopPropagation()}>
                    {action.icon}
                    <span>{action.label}</span>
                  </Link>
                </DropdownMenu.Item>
              </Wrapper>
              {!isLastAction && <DropdownMenu.Separator />}
            </Fragment>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
