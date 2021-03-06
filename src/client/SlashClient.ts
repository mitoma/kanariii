/// <reference path="../../node_modules/@kintone/dts-gen/kintone.d.ts" />

type OrganizationsAndGroups = {
  organizations: Organization[];
  groups: Group[];
};

type Organization = {
  id: string;
  name: string;
  code: string;
  parentCode: string;
  localName: string;
  localNameLocale: string;
  description: string;
};

type Organizations = {
  organizations: Organization[];
};

type Title = {
  id: string;
  code: string;
  name: string;
  description: string;
};

type OrganizationTitle = {
  organization: Organization;
  title: Title;
};

type OrganizationTitles = {
  organizationTitles: OrganizationTitle[];
};

type Group = {
  id: string;
  code: string;
  name: string;
  description: string;
};

type Groups = {
  groups: Group[];
};

class SlashClient {
  async loadOrganizationsAndGroups() {
    const [organizations, groups] = await Promise.all([
      this.loadOrganizations(),
      this.loadGroups(),
    ]);

    const organizationsAndGroups: OrganizationsAndGroups = {
      organizations: organizations as Organization[],
      groups: groups as Group[],
    };
    return organizationsAndGroups;
  }

  async loadUserOrganizations() {
    const resp: OrganizationTitles = await kintone.api(
      this.url('/v1/user/organizations'),
      'GET',
      { code: kintone.getLoginUser().code },
    );
    return resp.organizationTitles.map(orgAndTitle => {
      return orgAndTitle.organization;
    });
  }

  async loadOrganizations() {
    const resp: Organizations = await kintone.api(
      this.url('/v1/organizations'),
      'GET',
      {},
    );
    return resp.organizations;
  }

  async loadUserGroups() {
    const resp: Groups = await kintone.api(this.url('/v1/user/groups'), 'GET', {
      code: kintone.getLoginUser().code,
    });
    return resp.groups;
  }

  async loadGroups() {
    const resp: Groups = await kintone.api(this.url('/v1/groups'), 'GET', {
      code: kintone.getLoginUser().code,
    });
    return resp.groups;
  }

  private url(path: string): string {
    return kintone.api.url(path, true);
  }
}

export { SlashClient, OrganizationsAndGroups, Organization, Group };
