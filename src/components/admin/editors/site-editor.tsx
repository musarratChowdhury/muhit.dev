"use client";

import * as React from "react";
import Image from "next/image";
import { saveMain } from "@/app/admin/actions";
import type { SiteContent, SocialIcon, SocialLink, ThemeSettings } from "@/types/content";
import { BUNDLED_PORTRAIT, isRemoteImage } from "@/lib/site-assets";
import { EditorHeader } from "@/components/admin/save-button";
import { Repeater } from "@/components/admin/repeater";
import { useEditor } from "@/components/admin/use-editor";
import {
  ColorField,
  LinesField,
  RowGrid,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/admin/form";
import { Button } from "@/components/admin/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { Card } from "@/components/admin/ui/card";

const SOCIAL_ICONS: readonly SocialIcon[] = [
  "github",
  "linkedin",
  "mail",
  "youtube",
  "facebook",
  "instagram",
  "globe",
];

type Payload = { site: SiteContent["site"]; theme: ThemeSettings };

/**
 * The hero portrait is a URL, not an upload: paste a link to an image hosted
 * elsewhere, or clear the field to fall back to the bundled file.
 *
 * The preview is debounced so a half-typed URL does not fire a request on every
 * keystroke, and it says so plainly when the image cannot be loaded.
 */
function PortraitField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const source = value.trim() || BUNDLED_PORTRAIT;
  const [preview, setPreview] = React.useState(source);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setFailed(false);
      setPreview(source);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [source]);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        {failed ? (
          <span className="flex size-full items-center justify-center p-2 text-center text-[11px] leading-tight text-muted-foreground">
            Could not load that image
          </span>
        ) : (
          <Image
            src={preview}
            alt="Hero portrait preview"
            fill
            unoptimized={isRemoteImage(preview)}
            sizes="112px"
            className="object-cover object-top"
            onError={() => setFailed(true)}
          />
        )}
      </div>

      <div className="flex-1 space-y-3">
        <TextField
          label="Image URL"
          type="url"
          value={value}
          onChange={onChange}
          placeholder={BUNDLED_PORTRAIT}
          hint="A link to an image hosted elsewhere, e.g. https://cdn.example.com/me.jpg. The hero crops it to 4:5 and greyscales it."
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange(BUNDLED_PORTRAIT)}
          disabled={value.trim() === BUNDLED_PORTRAIT}
        >
          Use bundled portrait
        </Button>
      </div>
    </div>
  );
}

export function SiteEditor({
  initialSite,
  initialTheme,
}: {
  initialSite: SiteContent["site"];
  initialTheme: ThemeSettings;
}) {
  const editor = useEditor<Payload>({ site: initialSite, theme: initialTheme });
  const { site, theme } = editor.value;

  const setSite = React.useCallback(
    (changes: Partial<SiteContent["site"]>) =>
      editor.setValue((prev) => ({ ...prev, site: { ...prev.site, ...changes } })),
    [editor],
  );

  const setTheme = React.useCallback(
    (changes: Partial<ThemeSettings>) =>
      editor.setValue((prev) => ({ ...prev, theme: { ...prev.theme, ...changes } })),
    [editor],
  );

  async function handleSave() {
    const state = await saveMain(editor.value);
    if (state.ok) editor.markSaved();
    return state;
  }

  return (
    <div className="space-y-6">
      <EditorHeader
        title="Site & theme"
        description="Identity, portrait, contact details, the numbers on the hero, navigation and the colour system. Saving writes the whole main document."
        onSave={handleSave}
        dirty={editor.dirty}
      />

      <Tabs defaultValue="profile">
        <TabsList className="h-auto flex-wrap justify-start">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="nav">Navigation</TabsTrigger>
          <TabsTrigger value="more">About extras</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 pt-6">
          <Card className="gap-5 p-5">
            <div>
              <h2 className="text-sm font-medium">Hero portrait</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Point the hero at an image hosted elsewhere — no upload, just a
                URL. Clear it to fall back to the bundled portrait.
              </p>
            </div>
            <PortraitField
              value={site.portrait}
              onChange={(portrait) => setSite({ portrait })}
            />
          </Card>

          <Card className="gap-5 p-5">
            <RowGrid>
              <TextField
                label="Full name"
                value={site.name}
                onChange={(value) => setSite({ name: value })}
                hint="Used in the footer and metadata."
              />
              <TextField
                label="Short name"
                value={site.shortName}
                onChange={(value) => setSite({ shortName: value })}
              />
              <TextField
                label="First name"
                value={site.firstName}
                onChange={(value) => setSite({ firstName: value })}
              />
              <TextField
                label="Last name"
                value={site.lastName}
                onChange={(value) => setSite({ lastName: value })}
              />
              <TextField
                label="Initials"
                value={site.initials}
                onChange={(value) => setSite({ initials: value })}
                hint="Two or three letters for the monogram."
              />
              <TextField
                label="Domain"
                value={site.domain}
                onChange={(value) => setSite({ domain: value })}
              />
              <TextField
                label="Role"
                value={site.role}
                onChange={(value) => setSite({ role: value })}
                hint="Short form, e.g. Software Engineer (.NET)."
              />
              <TextField
                label="Long role"
                value={site.roleLong}
                onChange={(value) => setSite({ roleLong: value })}
              />
              <TextField
                label="Location"
                value={site.location}
                onChange={(value) => setSite({ location: value })}
              />
              <TextField
                label="Timezone"
                value={site.timezone}
                onChange={(value) => setSite({ timezone: value })}
              />
            </RowGrid>

            <TextField
              label="Availability"
              value={site.availability}
              onChange={(value) => setSite({ availability: value })}
              hint="The one-liner in the hero badge."
            />
            <TextField
              label="Site URL"
              type="url"
              value={site.url}
              onChange={(value) => setSite({ url: value })}
              hint="Absolute URL, used for canonical links and the sitemap."
            />
            <TextAreaField
              label="Tagline"
              value={site.tagline}
              onChange={(value) => setSite({ tagline: value })}
              rows={3}
            />
            <TextAreaField
              label="Summary"
              value={site.summary}
              onChange={(value) => setSite({ summary: value })}
              rows={6}
              hint="The long paragraph in the about section."
            />
            <TextAreaField
              label="Meta description"
              value={site.description}
              onChange={(value) => setSite({ description: value })}
              rows={3}
              hint="What search engines and social cards show."
            />
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6 pt-6">
          <Card className="gap-5 p-5">
            <TextField
              label="Public email"
              type="email"
              value={site.email}
              onChange={(value) => setSite({ email: value })}
              hint="Used by the contact page and every mailto link."
            />
          </Card>

          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-medium">Social links</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Order matters — this is the order in the footer and contact page.
              </p>
            </div>
            <Repeater
              items={site.socials}
              onChange={(socials) => setSite({ socials })}
              create={(): SocialLink => ({ label: "", href: "", icon: "globe" })}
              itemTitle={(social) => social.label}
              itemMeta={(social) => social.href}
              addLabel="Add social link"
              emptyLabel="No social links yet."
              render={(social, update) => (
                <>
                  <RowGrid>
                    <TextField
                      label="Label"
                      value={social.label}
                      onChange={(value) => update({ label: value })}
                    />
                    <SelectField
                      label="Icon"
                      value={social.icon}
                      options={SOCIAL_ICONS}
                      onChange={(value) => update({ icon: value })}
                    />
                  </RowGrid>
                  <TextField
                    label="URL"
                    value={social.href}
                    onChange={(value) => update({ href: value })}
                    placeholder="https://…"
                  />
                  <TextField
                    label="Handle"
                    value={social.handle ?? ""}
                    onChange={(value) => update({ handle: value })}
                    hint="Optional. Shown next to the icon on the CV page."
                  />
                </>
              )}
            />
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6 pt-6">
          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-medium">Hero stats</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Short numbers with a label. Keep the value under about eight
                characters so the row stays on one line.
              </p>
            </div>
            <Repeater
              items={site.stats}
              onChange={(stats) => setSite({ stats })}
              create={() => ({ value: "", label: "" })}
              itemTitle={(stat) => `${stat.value} — ${stat.label}`}
              addLabel="Add stat"
              emptyLabel="No stats yet."
              render={(stat, update) => (
                <RowGrid>
                  <TextField
                    label="Value"
                    value={stat.value}
                    onChange={(value) => update({ value })}
                  />
                  <TextField
                    label="Label"
                    value={stat.label}
                    onChange={(value) => update({ label: value })}
                  />
                </RowGrid>
              )}
            />
          </div>
        </TabsContent>

        <TabsContent value="nav" className="space-y-6 pt-6">
          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-medium">Navigation</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                The links in the top bar. Use paths like <code className="font-mono">/projects</code> or
                anchors like <code className="font-mono">/#about</code>.
              </p>
            </div>
            <Repeater
              items={site.nav}
              onChange={(nav) => setSite({ nav })}
              create={() => ({ label: "", href: "" })}
              itemTitle={(item) => item.label}
              itemMeta={(item) => item.href}
              addLabel="Add link"
              emptyLabel="No navigation links yet."
              render={(item, update) => (
                <RowGrid>
                  <TextField
                    label="Label"
                    value={item.label}
                    onChange={(value) => update({ label: value })}
                  />
                  <TextField
                    label="Href"
                    value={item.href}
                    onChange={(value) => update({ href: value })}
                  />
                </RowGrid>
              )}
            />
          </div>
        </TabsContent>

        <TabsContent value="more" className="space-y-6 pt-6">
          <Card className="gap-5 p-5">
            <LinesField
              label="Currently"
              value={site.currently}
              onChange={(currently) => setSite({ currently })}
              hint="One per line. Shown as the 'right now' list."
              rows={4}
            />
            <LinesField
              label="Languages"
              value={site.languages}
              onChange={(languages) => setSite({ languages })}
              hint="One per line."
              rows={3}
            />
          </Card>

          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-medium">Principles</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                The short cards in the about section.
              </p>
            </div>
            <Repeater
              items={site.principles}
              onChange={(principles) => setSite({ principles })}
              create={() => ({ title: "", description: "" })}
              itemTitle={(principle) => principle.title}
              addLabel="Add principle"
              emptyLabel="No principles yet."
              render={(principle, update) => (
                <>
                  <TextField
                    label="Title"
                    value={principle.title}
                    onChange={(value) => update({ title: value })}
                  />
                  <TextAreaField
                    label="Description"
                    value={principle.description}
                    onChange={(value) => update({ description: value })}
                    rows={3}
                  />
                </>
              )}
            />
          </div>
        </TabsContent>

        <TabsContent value="theme" className="space-y-6 pt-6">
          <Card className="gap-5 p-5">
            <div>
              <h2 className="text-sm font-medium">Colours</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                These are injected as CSS variables on every page. The accent tint
                and the readable text colour on top of it are derived automatically
                from the accent.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ColorField
                label="Accent"
                value={theme.accent}
                onChange={(value) => setTheme({ accent: value })}
                hint="Links, highlights and buttons."
              />
              <ColorField
                label="Background"
                value={theme.background}
                onChange={(value) => setTheme({ background: value })}
              />
              <ColorField
                label="Surface"
                value={theme.surface}
                onChange={(value) => setTheme({ surface: value })}
                hint="Cards and panels."
              />
              <ColorField
                label="Surface (raised)"
                value={theme.surface2}
                onChange={(value) => setTheme({ surface2: value })}
              />
              <ColorField
                label="Foreground"
                value={theme.foreground}
                onChange={(value) => setTheme({ foreground: value })}
              />
              <ColorField
                label="Muted"
                value={theme.muted}
                onChange={(value) => setTheme({ muted: value })}
              />
              <ColorField
                label="Muted (strong)"
                value={theme.mutedStrong}
                onChange={(value) => setTheme({ mutedStrong: value })}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-lg border p-4">
              <span className="text-xs text-muted-foreground">Preview</span>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: theme.accent, color: theme.background }}
              >
                Accent
              </span>
              <span
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  backgroundColor: theme.surface,
                  color: theme.foreground,
                  borderColor: theme.surface2,
                }}
              >
                Surface
              </span>
              <span className="text-xs" style={{ color: theme.muted }}>
                Muted text
              </span>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
